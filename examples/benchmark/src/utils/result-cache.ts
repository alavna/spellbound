import type { BenchmarkResult, ClassificationBenchmarkResult, ModelConfig } from '../types';

const RESULTS_KEY = 'benchmark-results';
const CLASS_RESULTS_KEY = 'benchmark-classification-results';
const MODELS_KEY = 'benchmark-models';

function cacheKey(modelId: string, scenarioId: string): string {
  return `${modelId}::${scenarioId}`;
}

// ── Issue-detection results ──

export function loadCachedResults(): BenchmarkResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BenchmarkResult[];
  } catch {
    return [];
  }
}

export function saveCachedResults(results: BenchmarkResult[]): void {
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  } catch {
    // localStorage full — silently fail
  }
}

export function getCachedResultKeys(results: BenchmarkResult[]): Set<string> {
  const keys = new Set<string>();
  for (const r of results) {
    keys.add(cacheKey(r.modelId, r.scenarioId));
  }
  return keys;
}

export function makeResultKey(modelId: string, scenarioId: string): string {
  return cacheKey(modelId, scenarioId);
}

// ── Classification results ──

export function loadCachedClassificationResults(): ClassificationBenchmarkResult[] {
  try {
    const raw = localStorage.getItem(CLASS_RESULTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ClassificationBenchmarkResult[];
  } catch {
    return [];
  }
}

export function saveCachedClassificationResults(results: ClassificationBenchmarkResult[]): void {
  try {
    localStorage.setItem(CLASS_RESULTS_KEY, JSON.stringify(results));
  } catch {
    // localStorage full
  }
}

export function getCachedClassificationKeys(results: ClassificationBenchmarkResult[]): Set<string> {
  const keys = new Set<string>();
  for (const r of results) {
    // Key includes dimension since one scenario can have multiple dimensions
    keys.add(`${r.modelId}::${r.scenarioId}::${r.dimension}`);
  }
  return keys;
}

export function makeClassificationKey(modelId: string, scenarioId: string, dimension: string): string {
  return `${modelId}::${scenarioId}::${dimension}`;
}

// ── Models list ──

export function loadCachedModels(): ModelConfig[] | null {
  try {
    const raw = localStorage.getItem(MODELS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ModelConfig[];
  } catch {
    return null;
  }
}

export function saveCachedModels(models: ModelConfig[]): void {
  try {
    localStorage.setItem(MODELS_KEY, JSON.stringify(models));
  } catch {
    // localStorage full
  }
}

// ── Clear all ──

export function clearAllCachedResults(): void {
  localStorage.removeItem(RESULTS_KEY);
  localStorage.removeItem(CLASS_RESULTS_KEY);
}
