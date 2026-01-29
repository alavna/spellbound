/**
 * Result of grammar checking
 */
export interface GrammarCheckResult {
  /** The original text that was checked */
  text: string;
  /** List of grammar issues found */
  issues: GrammarIssue[];
}

/**
 * A grammar issue found in the text
 */
export interface GrammarIssue {
  /** Unique identifier for the rule that triggered this issue */
  ruleId: string;
  /** Human-readable message describing the issue */
  message: string;
  /** Severity of the issue */
  severity: IssueSeverity;
  /** Start position in the original text */
  start: number;
  /** End position in the original text (exclusive) */
  end: number;
  /** The problematic text */
  match: string;
  /** Suggested replacements, ordered by likelihood */
  replacements: string[];
  /** Category of the grammar issue */
  category: IssueCategory;
}

/**
 * Severity levels for grammar issues
 */
export type IssueSeverity = 'error' | 'warning' | 'info';

/**
 * Categories of grammar issues
 */
export type IssueCategory =
  | 'spelling'
  | 'grammar'
  | 'punctuation'
  | 'capitalization'
  | 'style'
  | 'typography'
  | 'repetition'
  | 'custom';

/**
 * Interface for grammar rules (TypeScript-first approach)
 */
export interface GrammarRule {
  /** Unique identifier for the rule */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description of what the rule checks */
  description: string;
  /** Severity when rule is triggered */
  severity: IssueSeverity;
  /** Category of issues this rule produces */
  category: IssueCategory;
  /** Whether the rule is enabled by default */
  enabled: boolean;
  /** Check function that returns issues */
  check(context: RuleContext): GrammarIssue[];
}

/**
 * Context passed to grammar rules during checking
 */
export interface RuleContext {
  /** The full text being checked */
  text: string;
  /** Tokenized representation of the text */
  tokens: import('./spellcheck').Token[];
  /** Sentences extracted from the text */
  sentences: Sentence[];
  /** Helper to create an issue */
  createIssue(params: CreateIssueParams): GrammarIssue;
}

/**
 * Parameters for creating a grammar issue
 */
export interface CreateIssueParams {
  /** Start position */
  start: number;
  /** End position */
  end: number;
  /** The matched text */
  match: string;
  /** Error message */
  message: string;
  /** Suggested replacements */
  replacements?: string[];
}

/**
 * A sentence extracted from text
 */
export interface Sentence {
  /** The sentence text */
  text: string;
  /** Start position in original text */
  start: number;
  /** End position in original text */
  end: number;
  /** Tokens in this sentence */
  tokens: import('./spellcheck').Token[];
}

/**
 * JSON schema for pattern-based rules (simpler alternative to TypeScript rules)
 */
export interface PatternRule {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description */
  description: string;
  /** Severity */
  severity: IssueSeverity;
  /** Category */
  category: IssueCategory;
  /** Whether enabled by default */
  enabled: boolean;
  /** Regex pattern to match (string, will be converted to RegExp) */
  pattern: string;
  /** Regex flags (e.g., 'gi' for global case-insensitive) */
  flags?: string;
  /** Message to show (can use $1, $2 for capture groups) */
  message: string;
  /** Replacement suggestions (can use $1, $2 for capture groups) */
  replacements?: string[];
}

/**
 * Options for the grammar checker
 */
export interface GrammarCheckerOptions {
  /** Rules to use (if not provided, uses all registered rules) */
  rules?: GrammarRule[];
  /** Rule IDs to enable (overrides rule's default enabled state) */
  enableRules?: string[];
  /** Rule IDs to disable */
  disableRules?: string[];
  /** Persist enabled/disabled rules to localStorage */
  persist?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
  /** Content type for tokenization */
  contentType?: import('./spellcheck').ContentType;
}
