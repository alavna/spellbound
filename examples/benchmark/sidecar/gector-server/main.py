"""GECToR sidecar server for Spellbound Benchmark.

Exposes /check and /correct endpoints for grammar error correction
using GECToR sequence-tagging models via HuggingFace transformers.
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from typing import Any

import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForTokenClassification, AutoTokenizer


# ---------------------------------------------------------------------------
# Model registry
# ---------------------------------------------------------------------------

MODELS: dict[str, dict[str, Any]] = {}
DEFAULT_MODEL = os.getenv("GECTOR_MODEL", "Meyssa/gector-large-2024")

# GECToR edit-tag vocabulary (simplified)
KEEP_TAG = "$KEEP"
DELETE_TAG = "$DELETE"


def load_model(model_name: str) -> dict[str, Any]:
    """Load a GECToR model + tokenizer from HuggingFace."""
    if model_name in MODELS:
        return MODELS[model_name]

    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForTokenClassification.from_pretrained(model_name)
    model.eval()
    label_map = model.config.id2label

    MODELS[model_name] = {
        "tokenizer": tokenizer,
        "model": model,
        "label_map": label_map,
    }
    return MODELS[model_name]


# ---------------------------------------------------------------------------
# Inference helpers
# ---------------------------------------------------------------------------

def predict_tags(text: str, model_name: str) -> list[tuple[str, str]]:
    """Run GECToR inference and return (token, predicted_tag) pairs."""
    entry = load_model(model_name)
    tokenizer = entry["tokenizer"]
    model = entry["model"]
    label_map = entry["label_map"]

    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits[0]
    predictions = torch.argmax(logits, dim=-1).tolist()
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])

    result: list[tuple[str, str]] = []
    for token, pred_id in zip(tokens, predictions):
        # Skip special tokens
        if token in ("[CLS]", "[SEP]", "<s>", "</s>", "<pad>"):
            continue
        tag = label_map.get(pred_id, KEEP_TAG)
        result.append((token, tag))

    return result


def apply_corrections(text: str, token_tags: list[tuple[str, str]]) -> str:
    """Apply GECToR edit tags to produce corrected text."""
    corrected_tokens: list[str] = []

    for token, tag in token_tags:
        if tag == KEEP_TAG:
            corrected_tokens.append(token)
        elif tag == DELETE_TAG:
            continue  # Remove token
        elif tag.startswith("$REPLACE_"):
            replacement = tag[len("$REPLACE_"):]
            corrected_tokens.append(replacement)
        elif tag.startswith("$APPEND_"):
            append_text = tag[len("$APPEND_"):]
            corrected_tokens.append(token)
            corrected_tokens.append(append_text)
        elif tag.startswith("$TRANSFORM_"):
            # Handle morphological transforms
            corrected_tokens.append(token)  # Fallback: keep as-is
        else:
            corrected_tokens.append(token)

    return " ".join(corrected_tokens)


def extract_issues(
    text: str, token_tags: list[tuple[str, str]]
) -> list[dict[str, Any]]:
    """Extract issues from token-level predictions."""
    issues: list[dict[str, Any]] = []
    offset = 0

    for token, tag in token_tags:
        # Find token position in text
        idx = text.find(token, offset)
        if idx == -1:
            # Handle subword tokens (remove ## prefix)
            clean_token = token.lstrip("#")
            idx = text.find(clean_token, offset)

        if idx == -1:
            continue

        token_len = len(token.lstrip("#"))

        if tag != KEEP_TAG:
            issue_type = "grammar"
            replacement = token

            if tag == DELETE_TAG:
                replacement = ""
                message = f'Remove "{token}"'
            elif tag.startswith("$REPLACE_"):
                replacement = tag[len("$REPLACE_"):]
                # Heuristic: single-char diff likely spelling
                if len(token) > 2 and abs(len(token) - len(replacement)) <= 2:
                    issue_type = "spelling"
                message = f'Replace "{token}" with "{replacement}"'
            elif tag.startswith("$APPEND_"):
                append_text = tag[len("$APPEND_"):]
                replacement = f"{token} {append_text}"
                issue_type = "punctuation" if append_text in ".,;:!?" else "grammar"
                message = f'Insert "{append_text}" after "{token}"'
            else:
                message = f'Edit: {tag}'

            issues.append(
                {
                    "type": issue_type,
                    "severity": "error",
                    "original_text": token.lstrip("#"),
                    "replacement": replacement,
                    "message": message,
                    "offset_start": idx,
                    "offset_end": idx + token_len,
                }
            )

        offset = idx + token_len

    return issues


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Pre-load default model on startup."""
    try:
        load_model(DEFAULT_MODEL)
        print(f"Loaded default model: {DEFAULT_MODEL}")
    except Exception as e:
        print(f"Warning: failed to pre-load {DEFAULT_MODEL}: {e}")
    yield


app = FastAPI(title="GECToR Sidecar", version="1.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class CheckRequest(BaseModel):
    text: str
    model: str = DEFAULT_MODEL


class CheckResponse(BaseModel):
    issues: list[dict[str, Any]]


class CorrectRequest(BaseModel):
    text: str
    model: str = DEFAULT_MODEL


class CorrectResponse(BaseModel):
    corrected_text: str


@app.get("/health")
async def health():
    return {"status": "ok", "models": list(MODELS.keys())}


@app.post("/check", response_model=CheckResponse)
async def check(req: CheckRequest):
    token_tags = predict_tags(req.text, req.model)
    issues = extract_issues(req.text, token_tags)
    return CheckResponse(issues=issues)


@app.post("/correct", response_model=CorrectResponse)
async def correct(req: CorrectRequest):
    token_tags = predict_tags(req.text, req.model)
    corrected = apply_corrections(req.text, token_tags)
    return CorrectResponse(corrected_text=corrected)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8020)
