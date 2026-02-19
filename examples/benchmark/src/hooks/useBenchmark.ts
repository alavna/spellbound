import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import type {
  ModelConfig,
  BenchmarkResult,
  ClassificationBenchmarkResult,
  ModelRanking,
  RunProgress,
  JudgedResult,
} from '../types';
import type { ModelAdapter } from '../models/adapter';
import { OpenRouterAdapter } from '../models/openrouter';
import { SpellboundAdapter } from '../models/spellbound-adapter';
import { HarperAdapter } from '../models/harper-adapter';
import { NspellAdapter } from '../models/nspell-adapter';
import { HunspellWasmAdapter } from '../models/hunspell-wasm-adapter';
import { OllamaAdapter } from '../models/ollama-adapter';
import { LanguageToolAdapter } from '../models/languagetool-adapter';
import { TransformersSeq2SeqAdapter } from '../models/transformers-seq2seq-adapter';
import { GECToRAdapter } from '../models/gector-adapter';
import { TransformersZeroShotAdapter } from '../models/transformers-zeroshot-adapter';
import { TransformersEmotionAdapter } from '../models/transformers-emotion-adapter';
import { TransformersBiasAdapter } from '../models/transformers-bias-adapter';
import { TransformersNLIAdapter } from '../models/transformers-nli-adapter';
import { TransformersQualityAdapter } from '../models/transformers-quality-adapter';
import { runBenchmark, runClassificationBenchmark } from '../runner/benchmark-runner';
import { judgeIssues } from '../runner/judge';
import { getAllScenarios, getClassificationScenarios } from '../datasets';
import { useModelDownloads } from '../utils/model-download-manager';
import {
  loadCachedResults,
  saveCachedResults,
  getCachedResultKeys,
  loadCachedClassificationResults,
  saveCachedClassificationResults,
  getCachedClassificationKeys,
  loadCachedModels,
  saveCachedModels,
  clearAllCachedResults,
} from '../utils/result-cache';

const DEFAULT_MODELS: ModelConfig[] = [
  // Cloud LLMs (via OpenRouter)
  { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini', type: 'openrouter', model: 'openai/gpt-4o-mini', enabled: true, category: 'cloud-llm' },
  { id: 'openai/gpt-4o', label: 'GPT-4o', type: 'openrouter', model: 'openai/gpt-4o', enabled: false, category: 'cloud-llm' },
  { id: 'google/gemini-2.0-flash-lite:free', label: 'Gemini 2.0 Flash Lite', type: 'openrouter', model: 'google/gemini-2.0-flash-lite:free', enabled: true, category: 'cloud-llm' },
  { id: 'google/gemini-2.0-flash-001', label: 'Gemini 2.0 Flash', type: 'openrouter', model: 'google/gemini-2.0-flash-001', enabled: false, category: 'cloud-llm' },
  { id: 'anthropic/claude-3.5-haiku', label: 'Claude 3.5 Haiku', type: 'openrouter', model: 'anthropic/claude-3.5-haiku', enabled: false, category: 'cloud-llm' },
  { id: 'meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B', type: 'openrouter', model: 'meta-llama/llama-3.1-8b-instruct:free', enabled: false, category: 'cloud-llm' },
  // Rule-based (offline)
  { id: 'spellbound', label: 'Spellbound (offline)', type: 'spellbound', enabled: true, category: 'rule-based' },
  { id: 'harper', label: 'Harper.js', type: 'harper', enabled: false, category: 'rule-based' },
  { id: 'nspell', label: 'nspell (Hunspell JS)', type: 'nspell', enabled: false, category: 'rule-based' },
  { id: 'hunspell-wasm', label: 'Hunspell WASM', type: 'hunspell-wasm', enabled: false, category: 'rule-based' },
  // Local LLMs (via Ollama)
  { id: 'ollama-phi4-mini', label: 'Phi-4-mini (Ollama)', type: 'ollama', model: 'phi4-mini', enabled: false, category: 'local-service' },
  { id: 'ollama-qwen2.5-3b', label: 'Qwen2.5-3B (Ollama)', type: 'ollama', model: 'qwen2.5:3b', enabled: false, category: 'local-service' },
  { id: 'ollama-gemma3n-e2b', label: 'Gemma-3n-E2B (Ollama)', type: 'ollama', model: 'gemma3n:e2b', enabled: false, category: 'local-service' },
  { id: 'ollama-llama3.2-3b', label: 'Llama 3.2 3B (Ollama)', type: 'ollama', model: 'llama3.2:3b', enabled: false, category: 'local-service' },
  { id: 'ollama-qwen3-1.7b', label: 'Qwen3-1.7B (Ollama)', type: 'ollama', model: 'qwen3:1.7b', enabled: false, category: 'local-service' },
  // Local services
  { id: 'languagetool', label: 'LanguageTool', type: 'languagetool', enabled: false, category: 'local-service' },
  // ML models (offline, browser-based)
  { id: 'seq2seq-grammar-small', label: 'T5-small Grammar (ONNX)', type: 'transformers-seq2seq', model: 'Xenova/grammar-synthesis-small', enabled: false, category: 'ml-offline' },
  { id: 'seq2seq-aventiq', label: 'T5-small Grammar (AventIQ)', type: 'transformers-seq2seq', model: 'AventIQ-AI/T5-small-grammar-correction', enabled: false, category: 'ml-offline' },
  // GECToR (Python sidecar)
  { id: 'gector-large', label: 'GECToR Large 2024', type: 'gector', model: 'Meyssa/gector-large-2024', enabled: false, category: 'local-service' },
  { id: 'gector-base', label: 'GECToR Base 2020', type: 'gector', model: 'Meyssa/gector-base-2020', enabled: false, category: 'local-service' },
  // Classification models (ML, offline)
  { id: 'zeroshot-modernbert', label: 'ModernBERT Zero-Shot', type: 'transformers-zeroshot', model: 'MoritzLaurer/ModernBERT-base-zeroshot-v2.0', enabled: false, category: 'ml-offline' },
  { id: 'emotion-roberta', label: 'GoEmotions (RoBERTa)', type: 'transformers-emotion', model: 'SamLowe/roberta-base-go_emotions-onnx', enabled: false, category: 'ml-offline' },
  { id: 'bias-detector', label: 'Bias Detector', type: 'transformers-bias', model: 'himel7/bias-detector', enabled: false, category: 'ml-offline' },
  { id: 'nli-roberta', label: 'NLI RoBERTa (Consistency)', type: 'transformers-nli', model: 'cross-encoder/nli-roberta-base', enabled: false, category: 'ml-offline' },
  { id: 'formality-classifier', label: 'Formality Classifier', type: 'transformers-quality', model: 'LenDigLearn/formality-classifier-mdeberta-v3-base', enabled: false, category: 'ml-offline' },
];

export function useBenchmark() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openrouter-api-key') || '');
  const [models, setModels] = useState<ModelConfig[]>(() => loadCachedModels() || DEFAULT_MODELS);
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>(['custom']);
  const [results, setResults] = useState<BenchmarkResult[]>(() => loadCachedResults());
  const [progress, setProgress] = useState<RunProgress>({
    phase: 'idle',
    currentModel: '',
    currentScenario: '',
    completedPairs: 0,
    totalPairs: 0,
  });
  const [classificationResults, setClassificationResults] = useState<ClassificationBenchmarkResult[]>(
    () => loadCachedClassificationResults()
  );
  const [judgeResults, setJudgeResults] = useState<JudgedResult[]>([]);
  const [judgeModel, setJudgeModel] = useState('openai/gpt-4o');
  const abortRef = useRef<AbortController | null>(null);
  const { downloads, markDownloading } = useModelDownloads();

  // Persist results whenever they change
  useEffect(() => { saveCachedResults(results); }, [results]);
  useEffect(() => { saveCachedClassificationResults(classificationResults); }, [classificationResults]);
  useEffect(() => { saveCachedModels(models); }, [models]);

  // Save API key to localStorage
  const updateApiKey = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem('openrouter-api-key', key);
  }, []);

  // Toggle model enabled state
  const toggleModel = useCallback((modelId: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === modelId ? { ...m, enabled: !m.enabled } : m))
    );
  }, []);

  // Add a custom model
  const addModel = useCallback((model: ModelConfig) => {
    setModels((prev) => [...prev, model]);
  }, []);

  // Remove a model (also remove its cached results)
  const removeModel = useCallback((modelId: string) => {
    setModels((prev) => prev.filter((m) => m.id !== modelId));
    setResults((prev) => prev.filter((r) => r.modelId !== modelId));
    setClassificationResults((prev) => prev.filter((r) => r.modelId !== modelId));
  }, []);

  // Clear all cached results
  const clearResults = useCallback(() => {
    setResults([]);
    setClassificationResults([]);
    setJudgeResults([]);
    clearAllCachedResults();
  }, []);

  // Create adapters
  const adapters = useMemo((): Map<string, ModelAdapter> => {
    const map = new Map<string, ModelAdapter>();
    map.set('openrouter', new OpenRouterAdapter(apiKey));
    map.set('spellbound', new SpellboundAdapter());
    map.set('harper', new HarperAdapter());
    map.set('nspell', new NspellAdapter());
    map.set('hunspell-wasm', new HunspellWasmAdapter());
    map.set('ollama', new OllamaAdapter());
    map.set('languagetool', new LanguageToolAdapter());
    map.set('transformers-seq2seq', new TransformersSeq2SeqAdapter(markDownloading));
    map.set('gector', new GECToRAdapter());
    map.set('transformers-zeroshot', new TransformersZeroShotAdapter(markDownloading));
    map.set('transformers-emotion', new TransformersEmotionAdapter(markDownloading));
    map.set('transformers-bias', new TransformersBiasAdapter(markDownloading));
    map.set('transformers-nli', new TransformersNLIAdapter(markDownloading));
    map.set('transformers-quality', new TransformersQualityAdapter(markDownloading));
    return map;
  }, [apiKey, markDownloading]);

  // Run the benchmark
  const run = useCallback(async () => {
    const scenarios = getAllScenarios(selectedDatasets);
    if (scenarios.length === 0) return;

    const enabledModels = models.filter((m) => m.enabled);
    if (enabledModels.length === 0) return;

    // Check if any OpenRouter model is enabled but no API key
    const hasOpenRouterModels = enabledModels.some((m) => m.type === 'openrouter');
    if (hasOpenRouterModels && !apiKey) {
      setProgress({
        phase: 'error',
        currentModel: '',
        currentScenario: '',
        completedPairs: 0,
        totalPairs: 0,
        error: 'Please enter an OpenRouter API key to use online models.',
      });
      return;
    }

    // Build skip sets from existing cached results
    const existingResultKeys = getCachedResultKeys(results);
    const existingClassKeys = getCachedClassificationKeys(classificationResults);

    // Don't reset — keep existing cached results, append new ones
    setJudgeResults([]);
    abortRef.current = new AbortController();

    let newResults: BenchmarkResult[] = [];
    let newClassResults: ClassificationBenchmarkResult[] = [];

    try {
      newResults = await runBenchmark({
        models: enabledModels,
        scenarios,
        adapters,
        concurrency: 3,
        skipKeys: existingResultKeys,
        onProgress: setProgress,
        onResult: (result) => {
          setResults((prev) => [...prev, result]);
        },
        signal: abortRef.current.signal,
      });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setProgress((prev) => ({ ...prev, phase: 'done' }));
        return;
      }
      // Log but don't stop — continue to classification
      console.error('Benchmark run error (continuing):', err);
    }

    // Run classification benchmark if classification scenarios are selected
    try {
      const classScenarios = getClassificationScenarios(selectedDatasets);
      if (classScenarios.length > 0) {
        newClassResults = await runClassificationBenchmark({
          models: enabledModels,
          scenarios: classScenarios,
          adapters,
          skipKeys: existingClassKeys,
          onProgress: setProgress,
          onResult: (result) => {
            setClassificationResults((prev) => [...prev, result]);
          },
          signal: abortRef.current.signal,
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setProgress((prev) => ({ ...prev, phase: 'done' }));
        return;
      }
      console.error('Classification run error (continuing):', err);
    }

    const totalNew = newResults.length + newClassResults.length;
    setProgress({
      phase: 'done',
      currentModel: '',
      currentScenario: '',
      completedPairs: totalNew,
      totalPairs: totalNew,
    });
  }, [models, selectedDatasets, apiKey, adapters, results, classificationResults]);

  // Cancel the run
  const cancel = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // Run LLM judge on results
  const runJudge = useCallback(async () => {
    if (!apiKey || results.length === 0) return;

    setProgress((prev) => ({ ...prev, phase: 'judging' }));
    const scenarios = getAllScenarios(selectedDatasets);

    const newJudgeResults: JudgedResult[] = [];
    for (const result of results) {
      if (result.detectedIssues.length === 0) continue;

      const scenario = scenarios.find((s) => s.id === result.scenarioId);
      if (!scenario) continue;

      const text = scenario.paragraphs.join('\n\n');

      try {
        const judged = await judgeIssues(
          text,
          result.detectedIssues,
          result.modelId,
          result.scenarioId,
          { apiKey, model: judgeModel }
        );
        newJudgeResults.push(judged);
        setJudgeResults((prev) => [...prev, judged]);
      } catch (err) {
        console.error('Judge failed for', result.modelId, result.scenarioId, err);
      }
    }

    setProgress((prev) => ({ ...prev, phase: 'done' }));
  }, [apiKey, results, selectedDatasets, judgeModel]);

  // Calculate rankings from results (exclude classification-only models)
  const rankings = useMemo((): ModelRanking[] => {
    const classificationOnlyIds = new Set(
      models
        .filter((m) => adapters.get(m.type)?.classificationOnly)
        .map((m) => m.id)
    );

    const modelMap = new Map<string, BenchmarkResult[]>();

    for (const result of results) {
      if (classificationOnlyIds.has(result.modelId)) continue;
      const list = modelMap.get(result.modelId) || [];
      list.push(result);
      modelMap.set(result.modelId, list);
    }

    const rankingList: ModelRanking[] = [];

    for (const [modelId, modelResults] of modelMap) {
      const model = models.find((m) => m.id === modelId);
      const totalTP = modelResults.reduce((s, r) => s + r.truePositives, 0);
      const totalFP = modelResults.reduce((s, r) => s + r.falsePositives, 0);
      const totalFN = modelResults.reduce((s, r) => s + r.falseNegatives, 0);
      const avgLatency =
        modelResults.reduce((s, r) => s + r.latencyMs, 0) / modelResults.length;

      const avgPrecision =
        modelResults.reduce((s, r) => s + r.precision, 0) / modelResults.length;
      const avgRecall =
        modelResults.reduce((s, r) => s + r.recall, 0) / modelResults.length;
      const avgF05 =
        modelResults.reduce((s, r) => s + r.f05, 0) / modelResults.length;

      rankingList.push({
        modelId,
        modelLabel: model?.label || modelId,
        avgPrecision,
        avgRecall,
        avgF05,
        avgLatencyMs: avgLatency,
        totalScenarios: modelResults.length,
        totalTruePositives: totalTP,
        totalFalsePositives: totalFP,
        totalFalseNegatives: totalFN,
      });
    }

    // Sort by F0.5 descending
    rankingList.sort((a, b) => b.avgF05 - a.avgF05);

    return rankingList;
  }, [results, models, adapters]);

  return {
    // State
    apiKey,
    models,
    selectedDatasets,
    results,
    classificationResults,
    progress,
    rankings,
    judgeResults,
    judgeModel,
    downloads,

    // Actions
    setApiKey: updateApiKey,
    toggleModel,
    addModel,
    removeModel,
    clearResults,
    setSelectedDatasets,
    setJudgeModel,
    run,
    cancel,
    runJudge,
  };
}
