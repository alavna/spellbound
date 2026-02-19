import type { ModelAdapter, CheckResult } from './adapter';
import type { ClassificationResult } from '../types';
import { createProgressCallback } from '../utils/model-download-manager';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pipeline = any;
let emotionPipeline: Pipeline | null = null;
let loadingPromise: Promise<Pipeline> | null = null;

async function getEmotionClassifier(
  modelId: string,
  onProgress?: (modelId: string, progress: number) => void
): Promise<Pipeline> {
  if (emotionPipeline) return emotionPipeline;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const { pipeline } = await import('@huggingface/transformers');
    const progressCallback = onProgress
      ? createProgressCallback(modelId, onProgress)
      : undefined;
    const classifier = await pipeline('text-classification', modelId, {
      progress_callback: progressCallback,
    });
    emotionPipeline = classifier;
    return classifier;
  })();

  return loadingPromise;
}

/** go_emotions model for tone/emotion analysis (28 emotion labels) */
export class TransformersEmotionAdapter implements ModelAdapter {
  readonly type = 'transformers-emotion';
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
    const classifier = await getEmotionClassifier(model, this.onProgress);
    const results = await classifier(text, { top_k: null });

    // Results come as array of { label, score }
    const allResults = Array.isArray(results[0]) ? results[0] : results;
    const labels: Array<{ label: string; score: number }> = allResults.map(
      (r: { label: string; score: number }) => ({
        label: r.label,
        score: r.score,
      })
    );

    // Sort by score descending
    labels.sort((a, b) => b.score - a.score);
    return { labels };
  }
}
