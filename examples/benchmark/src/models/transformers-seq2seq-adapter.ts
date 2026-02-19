import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue, IssueType } from '../types';
import { createProgressCallback } from '../utils/model-download-manager';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pipeline = any;
const pipelineCache = new Map<string, Pipeline>();

/** Diff original vs corrected text to extract issues */
function diffToIssues(original: string, corrected: string): BenchmarkIssue[] {
  const issues: BenchmarkIssue[] = [];
  if (original === corrected) return issues;

  // Simple word-level diff
  const origWords = original.split(/(\s+)/);
  const corrWords = corrected.split(/(\s+)/);
  let origOffset = 0;

  const minLen = Math.min(origWords.length, corrWords.length);
  for (let i = 0; i < minLen; i++) {
    if (origWords[i] !== corrWords[i] && origWords[i].trim().length > 0) {
      const type: IssueType = looksLikeSpelling(origWords[i], corrWords[i]) ? 'spelling' : 'grammar';
      issues.push({
        type,
        severity: 'error',
        originalText: origWords[i],
        replacement: corrWords[i],
        message: `"${origWords[i]}" → "${corrWords[i]}"`,
        offsetStart: origOffset,
        offsetEnd: origOffset + origWords[i].length,
      });
    }
    origOffset += origWords[i].length;
  }

  return issues;
}

/** Heuristic: if the edit distance is small and it's a single word, likely spelling */
function looksLikeSpelling(orig: string, corrected: string): boolean {
  const a = orig.toLowerCase().replace(/[^a-z]/g, '');
  const b = corrected.toLowerCase().replace(/[^a-z]/g, '');
  if (a.length === 0 || b.length === 0) return false;
  // If words are similar length and share a prefix, likely spelling
  const prefixLen = commonPrefixLength(a, b);
  return prefixLen >= Math.min(a.length, b.length) * 0.4;
}

function commonPrefixLength(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

async function getPipeline(
  modelId: string,
  onProgress?: (modelId: string, progress: number) => void
): Promise<Pipeline> {
  if (pipelineCache.has(modelId)) return pipelineCache.get(modelId)!;

  const { pipeline } = await import('@huggingface/transformers');
  const progressCallback = onProgress
    ? createProgressCallback(modelId, onProgress)
    : undefined;

  const pipe = await pipeline('text2text-generation', modelId, {
    progress_callback: progressCallback,
  });
  pipelineCache.set(modelId, pipe);
  return pipe;
}

export class TransformersSeq2SeqAdapter implements ModelAdapter {
  readonly type = 'transformers-seq2seq';
  readonly isOffline = true;
  private onProgress?: (modelId: string, progress: number) => void;

  constructor(onProgress?: (modelId: string, progress: number) => void) {
    this.onProgress = onProgress;
  }

  async check(text: string, model: string, _signal?: AbortSignal): Promise<CheckResult> {
    // Run correction, then diff to extract issues
    const { correctedText } = await this.correct(text, model, _signal);
    const issues = diffToIssues(text, correctedText);
    return { issues, correctedText };
  }

  async correct(text: string, model: string, _signal?: AbortSignal): Promise<{ correctedText: string; rawResponse?: string }> {
    const pipe = await getPipeline(model, this.onProgress);
    const result = await pipe(text, { max_length: 512 });
    const correctedText = (result as Array<{ generated_text: string }>)[0]?.generated_text || text;
    return { correctedText, rawResponse: correctedText };
  }
}
