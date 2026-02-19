import type {
  ClassificationBenchmarkResult,
  ClassificationDimension,
  ClassificationResult,
} from '../types';

/** Label sets for each classification dimension (used with zero-shot models) */
export const DIMENSION_LABELS: Record<ClassificationDimension, string[]> = {
  style: ['formal', 'casual', 'academic', 'marketing'],
  clarity: ['clear', 'vague', 'verbose', 'concise'],
  cliche: ['cliche', 'original phrasing'],
  bias: ['neutral', 'loaded', 'stereotyping-risk'],
  tone: ['friendly', 'critical', 'assertive', 'empathetic'],
};

/** Evaluate a classification result against expected label */
export function evaluateClassification(
  result: ClassificationResult,
  expectedLabel: string,
  dimension: ClassificationDimension,
  modelId: string,
  scenarioId: string,
  latencyMs: number
): ClassificationBenchmarkResult {
  const topLabel = result.labels[0];
  const predictedLabel = topLabel?.label || '';
  const confidence = topLabel?.score || 0;

  // Case-insensitive comparison
  const correct = predictedLabel.toLowerCase() === expectedLabel.toLowerCase();

  return {
    modelId,
    scenarioId,
    dimension,
    expectedLabel,
    predictedLabel,
    correct,
    confidence,
    allLabels: result.labels,
    latencyMs,
  };
}

/** Calculate per-dimension accuracy from classification results */
export function calculateDimensionAccuracy(
  results: ClassificationBenchmarkResult[]
): Record<ClassificationDimension, { correct: number; total: number; accuracy: number }> {
  const dimensions = new Map<ClassificationDimension, { correct: number; total: number }>();

  for (const result of results) {
    const entry = dimensions.get(result.dimension) || { correct: 0, total: 0 };
    entry.total++;
    if (result.correct) entry.correct++;
    dimensions.set(result.dimension, entry);
  }

  const output: Record<string, { correct: number; total: number; accuracy: number }> = {};
  for (const [dim, { correct, total }] of dimensions) {
    output[dim] = { correct, total, accuracy: total > 0 ? correct / total : 0 };
  }

  return output as Record<ClassificationDimension, { correct: number; total: number; accuracy: number }>;
}

/** Calculate overall accuracy across all dimensions */
export function calculateOverallAccuracy(results: ClassificationBenchmarkResult[]): number {
  if (results.length === 0) return 0;
  const correct = results.filter((r) => r.correct).length;
  return correct / results.length;
}
