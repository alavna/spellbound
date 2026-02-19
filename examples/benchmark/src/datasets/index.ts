import type { TestScenario, ClassificationScenario, DatasetInfo } from '../types';
import { ALL_CUSTOM_SCENARIOS } from './custom-scenarios';
import { ALL_GRAMMAR_SCENARIOS } from './grammar-scenarios';
import { CLASSIFICATION_SCENARIOS } from './classification-scenarios';
import { parseM2File } from './m2-parser';
import { parseJFLEGFiles } from './jfleg-parser';

/** Registry of all loaded datasets */
const loadedDatasets: Map<string, TestScenario[]> = new Map();

/** Initialize with built-in scenarios */
loadedDatasets.set('custom', ALL_CUSTOM_SCENARIOS);
loadedDatasets.set('grammar', ALL_GRAMMAR_SCENARIOS);
loadedDatasets.set('classification', CLASSIFICATION_SCENARIOS);

export function getDatasetInfos(): DatasetInfo[] {
  const infos: DatasetInfo[] = [
    {
      id: 'custom',
      name: 'Custom Scenarios',
      source: 'custom',
      scenarioCount: ALL_CUSTOM_SCENARIOS.length,
      description: `${ALL_CUSTOM_SCENARIOS.length} hand-crafted scenarios covering blog posts, emails, academic writing, legal documents, and more.`,
    },
    {
      id: 'grammar',
      name: 'Grammar (ESL-style)',
      source: 'custom',
      scenarioCount: ALL_GRAMMAR_SCENARIOS.length,
      description: `${ALL_GRAMMAR_SCENARIOS.length} scenarios focused on grammar errors: articles, prepositions, subject-verb agreement, verb tense, noun number, word form, pronouns, and sentence structure.`,
    },
    {
      id: 'classification',
      name: 'Classification Scenarios',
      source: 'custom',
      scenarioCount: CLASSIFICATION_SCENARIOS.length,
      description: `${CLASSIFICATION_SCENARIOS.length} scenarios for style, clarity, tone, cliche, and bias classification.`,
    },
  ];

  if (loadedDatasets.has('conll2014')) {
    const scenarios = loadedDatasets.get('conll2014')!;
    infos.push({
      id: 'conll2014',
      name: 'CoNLL-2014',
      source: 'conll2014',
      scenarioCount: scenarios.length,
      description: `${scenarios.length} scenarios from the CoNLL-2014 shared task on grammatical error correction.`,
    });
  }

  if (loadedDatasets.has('bea2019')) {
    const scenarios = loadedDatasets.get('bea2019')!;
    infos.push({
      id: 'bea2019',
      name: 'BEA-2019',
      source: 'bea2019',
      scenarioCount: scenarios.length,
      description: `${scenarios.length} scenarios from the BEA-2019 shared task.`,
    });
  }

  if (loadedDatasets.has('jfleg')) {
    const scenarios = loadedDatasets.get('jfleg')!;
    infos.push({
      id: 'jfleg',
      name: 'JFLEG',
      source: 'jfleg',
      scenarioCount: scenarios.length,
      description: `${scenarios.length} scenarios from the JFLEG fluency corpus (evaluated with GLEU).`,
    });
  }

  return infos;
}

export function getScenarios(datasetId: string): TestScenario[] {
  return loadedDatasets.get(datasetId) || [];
}

export function getAllScenarios(datasetIds: string[]): TestScenario[] {
  const scenarios: TestScenario[] = [];
  for (const id of datasetIds) {
    scenarios.push(...getScenarios(id));
  }
  return scenarios;
}

export async function loadM2Dataset(
  file: File,
  source: 'conll2014' | 'bea2019'
): Promise<TestScenario[]> {
  const text = await file.text();
  const scenarios = parseM2File(text, source);
  loadedDatasets.set(source, scenarios);
  return scenarios;
}

export async function loadJFLEGDataset(
  srcFile: File,
  refFiles: File[]
): Promise<TestScenario[]> {
  const srcText = await srcFile.text();
  const refTexts = await Promise.all(refFiles.map((f) => f.text()));
  const scenarios = parseJFLEGFiles(srcText, refTexts);
  loadedDatasets.set('jfleg', scenarios);
  return scenarios;
}

export function removeDataset(datasetId: string): void {
  loadedDatasets.delete(datasetId);
}

/** Get classification scenarios (only from the classification dataset) */
export function getClassificationScenarios(datasetIds: string[]): ClassificationScenario[] {
  if (!datasetIds.includes('classification')) return [];
  return CLASSIFICATION_SCENARIOS;
}
