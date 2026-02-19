import type {
  ModelConfig,
  TestScenario,
  BenchmarkResult,
  ClassificationScenario,
  ClassificationBenchmarkResult,
  RunProgress,
} from '../types';
import type { ModelAdapter } from '../models/adapter';
import { evaluateResult, calculateGLEU } from './evaluator';
import { DIMENSION_LABELS, evaluateClassification } from './classification-evaluator';

export interface RunnerOptions {
  models: ModelConfig[];
  scenarios: TestScenario[];
  adapters: Map<string, ModelAdapter>;
  concurrency?: number;
  /** Keys of model+scenario pairs to skip (already cached). Key format: "modelId::scenarioId" */
  skipKeys?: Set<string>;
  onProgress?: (progress: RunProgress) => void;
  onResult?: (result: BenchmarkResult) => void;
  signal?: AbortSignal;
}

/**
 * Run the benchmark across all model+scenario pairs.
 * OpenRouter models run with concurrency limit; offline models run sequentially.
 */
export async function runBenchmark(options: RunnerOptions): Promise<BenchmarkResult[]> {
  const {
    models,
    scenarios,
    adapters,
    concurrency = 3,
    skipKeys,
    onProgress,
    onResult,
    signal,
  } = options;

  // Exclude classification-only models from issue-detection benchmarks
  const enabledModels = models.filter((m) => m.enabled && !adapters.get(m.type)?.classificationOnly);
  const shouldSkip = (modelId: string, scenarioId: string): boolean =>
    skipKeys != null && skipKeys.has(`${modelId}::${scenarioId}`);

  // Count only pairs we'll actually run
  let totalPairs = 0;
  for (const m of enabledModels) {
    for (const s of scenarios) {
      if (!shouldSkip(m.id, s.id)) totalPairs++;
    }
  }

  const results: BenchmarkResult[] = [];
  let completedPairs = 0;

  const reportProgress = (model: string, scenario: string): void => {
    onProgress?.({
      phase: 'running',
      currentModel: model,
      currentScenario: scenario,
      completedPairs,
      totalPairs,
    });
  };

  // Separate online and offline models based on adapter's isOffline flag
  const offlineModels = enabledModels.filter((m) => adapters.get(m.type)?.isOffline);
  const onlineModels = enabledModels.filter((m) => !adapters.get(m.type)?.isOffline);

  // Run offline models first (they're fast)
  for (const model of offlineModels) {
    const adapter = adapters.get(model.type);
    if (!adapter) continue;

    let modelFailed = false;

    for (const scenario of scenarios) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      if (shouldSkip(model.id, scenario.id)) continue;

      // If model already failed (e.g. download error), skip remaining scenarios
      if (modelFailed) {
        const errorResult: BenchmarkResult = {
          modelId: model.id,
          scenarioId: scenario.id,
          detectedIssues: [],
          expectedIssues: scenario.expectedIssues,
          truePositives: 0,
          falsePositives: 0,
          falseNegatives: scenario.expectedIssues.length,
          precision: 0,
          recall: 0,
          f05: 0,
          latencyMs: 0,
          rawResponse: 'Skipped: model failed to initialize',
        };
        results.push(errorResult);
        onResult?.(errorResult);
        completedPairs++;
        continue;
      }

      reportProgress(model.label, scenario.title);

      try {
        const result = await runSingle(adapter, model, scenario, signal);
        results.push(result);
        onResult?.(result);
      } catch (err) {
        // Model failed (likely download/init error) — mark as failed and skip rest
        modelFailed = true;
        console.warn(`Model ${model.id} failed on scenario ${scenario.id}:`, err);
        const errorResult: BenchmarkResult = {
          modelId: model.id,
          scenarioId: scenario.id,
          detectedIssues: [],
          expectedIssues: scenario.expectedIssues,
          truePositives: 0,
          falsePositives: 0,
          falseNegatives: scenario.expectedIssues.length,
          precision: 0,
          recall: 0,
          f05: 0,
          latencyMs: 0,
          rawResponse: `Error: ${err}`,
        };
        results.push(errorResult);
        onResult?.(errorResult);
      }

      completedPairs++;
      reportProgress(model.label, scenario.title);
    }
  }

  // Run online models with concurrency limit
  const onlineTasks: Array<{ model: ModelConfig; scenario: TestScenario }> = [];
  for (const model of onlineModels) {
    for (const scenario of scenarios) {
      if (!shouldSkip(model.id, scenario.id)) {
        onlineTasks.push({ model, scenario });
      }
    }
  }

  // Process in batches
  for (let i = 0; i < onlineTasks.length; i += concurrency) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const batch = onlineTasks.slice(i, i + concurrency);

    const batchResults = await Promise.allSettled(
      batch.map(async ({ model, scenario }) => {
        const adapter = adapters.get(model.type);
        if (!adapter) throw new Error(`No adapter for ${model.type}`);

        reportProgress(model.label, scenario.title);
        return runSingle(adapter, model, scenario, signal);
      })
    );

    for (let j = 0; j < batchResults.length; j++) {
      const settledResult = batchResults[j];
      const { model, scenario } = batch[j];

      if (settledResult.status === 'fulfilled') {
        results.push(settledResult.value);
        onResult?.(settledResult.value);
      } else {
        // Create error result
        const errorResult: BenchmarkResult = {
          modelId: model.id,
          scenarioId: scenario.id,
          detectedIssues: [],
          expectedIssues: scenario.expectedIssues,
          truePositives: 0,
          falsePositives: 0,
          falseNegatives: scenario.expectedIssues.length,
          precision: 0,
          recall: 0,
          f05: 0,
          latencyMs: 0,
          rawResponse: `Error: ${settledResult.reason}`,
        };
        results.push(errorResult);
        onResult?.(errorResult);
      }

      completedPairs++;
      reportProgress(model.label, scenario.title);
    }
  }

  return results;
}

export interface ClassificationRunnerOptions {
  models: ModelConfig[];
  scenarios: ClassificationScenario[];
  adapters: Map<string, ModelAdapter>;
  /** Keys to skip. Format: "modelId::scenarioId::dimension" */
  skipKeys?: Set<string>;
  onProgress?: (progress: RunProgress) => void;
  onResult?: (result: ClassificationBenchmarkResult) => void;
  signal?: AbortSignal;
}

/**
 * Run classification evaluation: each model × scenario × dimension.
 * Only models whose adapter implements classify() are run.
 */
export async function runClassificationBenchmark(
  options: ClassificationRunnerOptions
): Promise<ClassificationBenchmarkResult[]> {
  const { models, scenarios, adapters, skipKeys, onProgress, onResult, signal } = options;

  const shouldSkip = (modelId: string, scenarioId: string, dimension: string): boolean =>
    skipKeys != null && skipKeys.has(`${modelId}::${scenarioId}::${dimension}`);

  const classifiableModels = models.filter((m) => {
    const adapter = adapters.get(m.type);
    return adapter && typeof adapter.classify === 'function';
  });

  if (classifiableModels.length === 0 || scenarios.length === 0) return [];

  // Count total pairs (excluding skipped)
  let totalPairs = 0;
  for (const model of classifiableModels) {
    for (const scenario of scenarios) {
      for (const exp of scenario.expectedClassifications) {
        if (!shouldSkip(model.id, scenario.id, exp.dimension)) totalPairs++;
      }
    }
  }

  const results: ClassificationBenchmarkResult[] = [];
  let completedPairs = 0;

  for (const model of classifiableModels) {
    const adapter = adapters.get(model.type)!;

    for (const scenario of scenarios) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

      const fullText = scenario.paragraphs.join('\n\n');

      for (const expected of scenario.expectedClassifications) {
        if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
        if (shouldSkip(model.id, scenario.id, expected.dimension)) continue;

        onProgress?.({
          phase: 'running',
          currentModel: model.label,
          currentScenario: `${scenario.title} [${expected.dimension}]`,
          completedPairs,
          totalPairs,
        });

        const labels = DIMENSION_LABELS[expected.dimension];
        const start = performance.now();

        try {
          const classResult = await adapter.classify!(
            fullText,
            model.model || model.id,
            labels,
            signal
          );
          const latencyMs = performance.now() - start;

          const evaluated = evaluateClassification(
            classResult,
            expected.expectedLabel,
            expected.dimension,
            model.id,
            scenario.id,
            latencyMs
          );

          results.push(evaluated);
          onResult?.(evaluated);
        } catch (err) {
          const latencyMs = performance.now() - start;
          results.push({
            modelId: model.id,
            scenarioId: scenario.id,
            dimension: expected.dimension,
            expectedLabel: expected.expectedLabel,
            predictedLabel: `Error: ${err}`,
            correct: false,
            confidence: 0,
            allLabels: [],
            latencyMs,
          });
        }

        completedPairs++;
      }
    }
  }

  return results;
}

async function runSingle(
  adapter: ModelAdapter,
  model: ModelConfig,
  scenario: TestScenario,
  signal?: AbortSignal
): Promise<BenchmarkResult> {
  const fullText = scenario.paragraphs.join('\n\n');
  const start = performance.now();

  // For JFLEG scenarios, use correction mode if available
  if (scenario.source === 'jfleg' && adapter.correct && scenario.references) {
    const { correctedText, rawResponse } = await adapter.correct(
      fullText,
      model.model || model.id,
      signal
    );
    const latencyMs = performance.now() - start;

    // Calculate GLEU against references
    const allRefs = scenario.references;
    let totalGleu = 0;
    let sentCount = 0;

    const correctedSentences = correctedText.split('\n').filter((s) => s.trim());
    for (let i = 0; i < scenario.paragraphs.length; i++) {
      const refs = allRefs[i] || [];
      const hyp = correctedSentences[i] || scenario.paragraphs[i];
      if (refs.length > 0) {
        totalGleu += calculateGLEU(scenario.paragraphs[i], hyp, refs);
        sentCount++;
      }
    }
    const avgGleu = sentCount > 0 ? totalGleu / sentCount : 0;

    return {
      modelId: model.id,
      scenarioId: scenario.id,
      detectedIssues: [],
      expectedIssues: [],
      truePositives: 0,
      falsePositives: 0,
      falseNegatives: 0,
      precision: 0,
      recall: 0,
      f05: 0,
      latencyMs,
      rawResponse,
      correctedText,
      gleu: avgGleu,
    };
  }

  // Standard issue-detection mode
  const { issues, rawResponse } = await adapter.check(
    fullText,
    model.model || model.id,
    signal
  );
  const latencyMs = performance.now() - start;

  return evaluateResult(
    issues,
    scenario.expectedIssues,
    latencyMs,
    model.id,
    scenario.id,
    rawResponse
  );
}
