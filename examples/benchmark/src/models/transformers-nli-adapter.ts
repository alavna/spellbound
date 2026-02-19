import type { ModelAdapter, CheckResult } from './adapter';
import type { ClassificationResult } from '../types';
import { createProgressCallback } from '../utils/model-download-manager';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pipeline = any;
let nliPipeline: Pipeline | null = null;
let loadingPromise: Promise<Pipeline> | null = null;

async function getNLIClassifier(
  modelId: string,
  onProgress?: (modelId: string, progress: number) => void
): Promise<Pipeline> {
  if (nliPipeline) return nliPipeline;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    const { pipeline } = await import('@huggingface/transformers');
    const progressCallback = onProgress
      ? createProgressCallback(modelId, onProgress)
      : undefined;
    const classifier = await pipeline('text-classification', modelId, {
      progress_callback: progressCallback,
    });
    nliPipeline = classifier;
    return classifier;
  })();

  return loadingPromise;
}

/** NLI adapter for consistency checking.
 * Takes sentence pairs and classifies as contradiction/entailment/neutral. */
export class TransformersNLIAdapter implements ModelAdapter {
  readonly type = 'transformers-nli';
  readonly isOffline = true;
  readonly classificationOnly = true;
  private onProgress?: (modelId: string, progress: number) => void;

  constructor(onProgress?: (modelId: string, progress: number) => void) {
    this.onProgress = onProgress;
  }

  async check(_text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    return { issues: [] };
  }

  async classify(text: string, model: string, labels: string[], _signal?: AbortSignal): Promise<ClassificationResult> {
    const classifier = await getNLIClassifier(model, this.onProgress);
    // For NLI, text should be formatted as "premise [SEP] hypothesis"
    const results = await classifier(text);

    const allResults = Array.isArray(results[0]) ? results[0] : results;
    const resultLabels: Array<{ label: string; score: number }> = [];

    if (Array.isArray(allResults)) {
      for (const r of allResults) {
        resultLabels.push({ label: r.label, score: r.score });
      }
    } else {
      resultLabels.push({ label: allResults.label, score: allResults.score });
    }

    // If labels were provided, filter/map to them
    if (labels.length > 0) {
      resultLabels.sort((a, b) => b.score - a.score);
    }

    return { labels: resultLabels };
  }
}
