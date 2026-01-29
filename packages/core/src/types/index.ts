// Spell check types
export type {
  SpellCheckResult,
  Suggestion,
  SpellCheckerOptions,
  ContentType,
  Token,
  TokenType,
} from './spellcheck';

// Grammar types
export type {
  GrammarCheckResult,
  GrammarIssue,
  IssueSeverity,
  IssueCategory,
  GrammarRule,
  RuleContext,
  CreateIssueParams,
  Sentence,
  PatternRule,
  GrammarCheckerOptions,
} from './grammar';

// Dictionary types
export type {
  Dictionary,
  CompressedDictionary,
  DictionaryLoadOptions,
  DictionaryManagerOptions,
  DictionaryStats,
} from './dictionary';

// Persistence types
export type {
  Storage,
  PersistenceOptions,
  PersistedUserDictionary,
  PersistedRuleSettings,
} from './persistence';
