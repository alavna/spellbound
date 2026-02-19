/** All issue type categories */
export type IssueType =
  | 'spelling'
  | 'grammar'
  | 'punctuation'
  | 'style'
  | 'tone'
  | 'clarity'
  | 'consistency'
  | 'cliche'
  | 'bias';

/** Unified issue format — all adapters normalize to this */
export interface BenchmarkIssue {
  type: IssueType;
  severity: 'error' | 'warning' | 'info';
  originalText: string;
  replacement: string;
  message: string;
  offsetStart: number;
  offsetEnd: number;
}

/** Expected issue in a scenario */
export interface ExpectedIssue {
  type: IssueType;
  originalText: string;
  expectedFix?: string;
  description: string;
}

/** Test scenario — works for custom + research datasets */
export interface TestScenario {
  id: string;
  title: string;
  description: string;
  source: 'custom' | 'conll2014' | 'bea2019' | 'jfleg';
  paragraphs: string[];
  expectedIssues: ExpectedIssue[];
  /** For JFLEG: reference corrections (up to 4) */
  references?: string[][];
}

/** Classification dimension for text analysis */
export type ClassificationDimension = 'style' | 'clarity' | 'cliche' | 'bias' | 'tone';

/** Expected classification for a scenario */
export interface ExpectedClassification {
  dimension: ClassificationDimension;
  expectedLabel: string;
}

/** Classification scenario — extends TestScenario with expected labels */
export interface ClassificationScenario extends TestScenario {
  expectedClassifications: ExpectedClassification[];
}

/** Result from a classification model */
export interface ClassificationResult {
  labels: Array<{ label: string; score: number }>;
  rawResponse?: string;
}

/** Result for a classification model + scenario pair */
export interface ClassificationBenchmarkResult {
  modelId: string;
  scenarioId: string;
  dimension: ClassificationDimension;
  expectedLabel: string;
  predictedLabel: string;
  correct: boolean;
  confidence: number;
  allLabels: Array<{ label: string; score: number }>;
  latencyMs: number;
}

/** Model category for grouping in UI */
export type ModelCategory = 'rule-based' | 'ml-offline' | 'local-service' | 'cloud-llm';

/** Model config — extensible for all adapter types */
export interface ModelConfig {
  id: string;
  label: string;
  type: string;
  /** Model identifier (e.g. OpenRouter model ID, Ollama model name) */
  model?: string;
  enabled: boolean;
  /** Category for UI grouping */
  category?: ModelCategory;
}

/** Result for a single model + scenario pair */
export interface BenchmarkResult {
  modelId: string;
  scenarioId: string;
  detectedIssues: BenchmarkIssue[];
  expectedIssues: ExpectedIssue[];
  truePositives: number;
  falsePositives: number;
  falseNegatives: number;
  precision: number;
  recall: number;
  f05: number;
  latencyMs: number;
  rawResponse?: string;
  /** For JFLEG scenarios */
  correctedText?: string;
  gleu?: number;
}

/** Aggregate ranking for a model across all scenarios */
export interface ModelRanking {
  modelId: string;
  modelLabel: string;
  avgPrecision: number;
  avgRecall: number;
  avgF05: number;
  avgLatencyMs: number;
  totalScenarios: number;
  totalTruePositives: number;
  totalFalsePositives: number;
  totalFalseNegatives: number;
}

/** LLM judge evaluation for a single issue */
export interface JudgedIssue {
  issue: BenchmarkIssue;
  isValid: boolean;
  categoryAccurate: boolean;
  fixAccurate: boolean;
  notes: string;
}

/** LLM judge result for a model + scenario */
export interface JudgedResult {
  modelId: string;
  scenarioId: string;
  judgedIssues: JudgedIssue[];
  overallAccuracy: number;
}

/** Runner progress state */
export interface RunProgress {
  phase: 'idle' | 'running' | 'judging' | 'done' | 'error';
  currentModel: string;
  currentScenario: string;
  completedPairs: number;
  totalPairs: number;
  error?: string;
}

/** Dataset source descriptor */
export interface DatasetInfo {
  id: string;
  name: string;
  source: TestScenario['source'];
  scenarioCount: number;
  description: string;
}
