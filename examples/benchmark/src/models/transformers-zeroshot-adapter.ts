import type { ModelAdapter, CheckResult } from './adapter';
import type { ClassificationResult } from '../types';
import { createProgressCallback } from '../utils/model-download-manager';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pipeline = any;
let classifierPipeline: Pipeline | null = null;
let loadingPromise: Promise<Pipeline> | null = null;

async function getClassifier(
  modelId: string,
  onProgress?: (modelId: string, progress: number) => void
): Promise<Pipeline> {
  if (classifierPipeline) return classifierPipeline;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const { pipeline } = await import('@huggingface/transformers');
    const progressCallback = onProgress
      ? createProgressCallback(modelId, onProgress)
      : undefined;
    const classifier = await pipeline('zero-shot-classification', modelId, {
      progress_callback: progressCallback,
    });
    classifierPipeline = classifier;
    return classifier;
  })();

  return loadingPromise;
}

/** ModernBERT zero-shot classification adapter.
 * A single model handles multiple dimensions via different label sets. */
export class TransformersZeroShotAdapter implements ModelAdapter {
  readonly type = 'transformers-zeroshot';
  readonly isOffline = true;
  readonly classificationOnly = true;
  private onProgress?: (modelId: string, progress: number) => void;

  constructor(onProgress?: (modelId: string, progress: number) => void) {
    this.onProgress = onProgress;
  }

  async check(_text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    // Zero-shot is classification-only; return empty issues
    return { issues: [] };
  }

  async classify(text: string, model: string, labels: string[], _signal?: AbortSignal): Promise<ClassificationResult> {
    const classifier = await getClassifier(model, this.onProgress);
    const result = await classifier(text, labels);

    const resultLabels: Array<{ label: string; score: number }> = [];
    if (result.labels && result.scores) {
      for (let i = 0; i < result.labels.length; i++) {
        resultLabels.push({
          label: result.labels[i] as string,
          score: result.scores[i] as number,
        });
      }
    }

    return { labels: resultLabels };
  }
}
