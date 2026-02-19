import type { BenchmarkIssue, IssueType } from '../types';

/** Valid issue types for normalization */
const VALID_TYPES: IssueType[] = [
  'spelling', 'grammar', 'punctuation', 'style', 'tone',
  'clarity', 'consistency', 'cliche', 'bias',
];

/** Default severity for each issue type */
const SEVERITY_MAP: Record<IssueType, BenchmarkIssue['severity']> = {
  spelling: 'error',
  grammar: 'error',
  punctuation: 'error',
  style: 'warning',
  tone: 'info',
  clarity: 'warning',
  consistency: 'warning',
  cliche: 'info',
  bias: 'warning',
};

/** Shared prompt for issue detection — used by OpenRouter and Ollama adapters */
export const ISSUE_DETECTION_PROMPT = `You are an expert writing checker. Analyze the text for ALL of the following issue types in a SINGLE pass:

## Categories (each issue belongs to exactly ONE category):

1. **spelling** - Misspelled words only. "teh" → "the", "accomodate" → "accommodate".
   Do NOT flag correctly spelled but misused words (that's grammar).

2. **grammar** - Subject-verb agreement, tense errors, wrong articles, pronoun case, fragments.
   Do NOT flag spelling or punctuation here.

3. **punctuation** - Missing/wrong commas, periods, semicolons, apostrophes, quotation marks.
   Do NOT flag spelling or grammar here.

4. **style** - Wordiness, unnecessary passive voice, unclear phrasing, awkward structure.
   Do NOT flag spelling/grammar/punctuation here.

5. **tone** - Inconsistent register, inappropriate formality, weak word choices, clichés.
   Do NOT flag spelling/grammar/punctuation/style here.

## CRITICAL rules for each issue:

- **original_text**: MUST be the EXACT substring from input (character-perfect match). Include 2-4 surrounding words for context.
- **replacement**: The corrected version of original_text with ONLY that issue fixed.
- **offset_start/offset_end**: Character positions of original_text in the input (0-indexed).
- **type**: One of "spelling", "grammar", "punctuation", "style", "tone".
- **message**: Brief explanation of the issue.

## Rules:
- Each text span gets ONE issue only (no duplicates across categories).
- Be conservative: flag clear errors, not debatable style preferences.
- If no issues found, return empty array.

Return JSON:
{"issues":[{"original_text":"exact text","offset_start":0,"offset_end":10,"replacement":"fixed text","type":"grammar","message":"Explanation"}]}`;

/** Shared prompt for text correction — used by OpenRouter and Ollama adapters */
export const CORRECTION_PROMPT = `You are an expert editor. Correct ALL errors in the following text (spelling, grammar, punctuation).
Return ONLY the corrected text. Do not add explanations, formatting, or anything else — just the corrected text.`;

/**
 * Parse LLM JSON response into BenchmarkIssue array.
 * Handles markdown code blocks, preamble text, arrays, and objects with `issues` key.
 */
export function parseIssuesFromJSON(raw: string): BenchmarkIssue[] {
  let jsonStr = raw;

  // Extract from markdown code blocks
  const codeBlockMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1];
  }

  // Find JSON object if there's preamble
  if (!jsonStr.trim().startsWith('{') && !jsonStr.trim().startsWith('[')) {
    const start = jsonStr.indexOf('{');
    if (start !== -1) {
      jsonStr = jsonStr.substring(start);
    }
  }

  const parsed = JSON.parse(jsonStr);
  const issuesArray = Array.isArray(parsed) ? parsed : (parsed.issues || []);

  return issuesArray.map((issue: Record<string, unknown>): BenchmarkIssue => {
    const type = (issue.type as string) || 'grammar';
    const normalizedType = VALID_TYPES.includes(type as IssueType)
      ? (type as IssueType)
      : 'grammar';

    return {
      type: normalizedType,
      severity: SEVERITY_MAP[normalizedType],
      originalText: (issue.original_text as string) || '',
      replacement: (issue.replacement as string) || '',
      message: (issue.message as string) || '',
      offsetStart: (issue.offset_start as number) ?? 0,
      offsetEnd: (issue.offset_end as number) ?? 0,
    };
  });
}
