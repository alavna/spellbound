import type { BenchmarkIssue, ClassificationResult } from '../types';

/** Result from a model check */
export interface CheckResult {
  issues: BenchmarkIssue[];
  rawResponse?: string;
  /** For JFLEG-style: corrected text output */
  correctedText?: string;
}

/** Adapter interface for all model backends */
export interface ModelAdapter {
  readonly type: string;
  /** If true, model runs sequentially (local/offline). If false, runs in batched concurrency (HTTP-based). */
  readonly isOffline: boolean;
  /** If true, this adapter only supports classify() — skip issue-detection benchmarks. */
  readonly classificationOnly?: boolean;
  check(text: string, model: string, signal?: AbortSignal): Promise<CheckResult>;
  /** JFLEG mode: return corrected text instead of issue list */
  correct?(text: string, model: string, signal?: AbortSignal): Promise<{ correctedText: string; rawResponse?: string }>;
  /** Classification mode: classify text against candidate labels */
  classify?(text: string, model: string, labels: string[], signal?: AbortSignal): Promise<ClassificationResult>;
}
