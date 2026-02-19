import type { ModelAdapter, CheckResult } from './adapter';
import type { ClassificationResult } from '../types';
import { createProgressCallback } from '../utils/model-download-manager';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pipeline = any;
const pipelineCache = new Map<string, Pipeline>();

async function getQualityClassifier(
  modelId: string,
  onProgress?: (modelId: string, progress: number) => void
): Promise<Pipeline> {
  if (pipelineCache.has(modelId)) return pipelineCache.get(modelId)!;

  const { pipeline } = await import('@huggingface/transformers');
  const progressCallback = onProgress
    ? createProgressCallback(modelId, onProgress)
    : undefined;
  const classifier = await pipeline('text-classification', modelId, {
    progress_callback: progressCallback,
  });
  pipelineCache.set(modelId, classifier);
  return classifier;
}

/** Quality/formality classification adapter.
 * Supports quality classifier (High/Medium/Low) and formality classifier. */
export class TransformersQualityAdapter implements ModelAdapter {
  readonly type = 'transformers-quality';
  readonly isOffline = true;
  readonly classificationOnly = true;
  private onProgress?: (modelId: string, progress: number) => void;

  constructor(onProgress?: (modelId: string, progress: number) => void) {
    this.onProgress = onProgress;
  }

  async check(_text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    return { issues: [] };
  }

  async classify(text: string, model: string, _labels: string[], _signal?: AbortSignal): Promise<ClassificationResult> {
    const classifier = await getQualityClassifier(model, this.onProgress);
    const results = await classifier(text, { top_k: null });

    const allResults = Array.isArray(results[0]) ? results[0] : results;
    const labels: Array<{ label: string; score: number }> = allResults.map(
      (r: { label: string; score: number }) => ({
        label: r.label,
        score: r.score,
      })
    );

    labels.sort((a, b) => b.score - a.score);
    return { labels };
  }
}
