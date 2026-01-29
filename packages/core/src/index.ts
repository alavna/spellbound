// Main exports
export { SpellChecker, createSpellChecker } from './spellcheck';
export { GrammarChecker, createGrammarChecker } from './grammar';
export { DictionaryManager, createDictionaryManager } from './dictionary';
export { RuleRegistry, createRuleRegistry } from './grammar';

// Dictionary utilities
export {
  Tokenizer,
  createTokenizer,
  loadDictionaryFromUrl,
  loadDictionaryFromJson,
  loadDictionaryFromWordList,
  loadDictionaryFromCsv,
  createEmptyDictionary,
  compressDictionary,
  mergeDictionaries,
} from './dictionary';

// Algorithms (for advanced use)
export {
  levenshtein,
  damerauLevenshtein,
  isWithinEditDistance,
  getOptimalEditDistance,
  Trie,
  BKTree,
  soundex,
  metaphone,
  phoneticSimilarity,
} from './algorithms';

// Built-in rules
export { builtInRules } from './rules';
export {
  capitalizationRules,
  punctuationRules,
  commonMistakesRules,
  repetitionRules,
  articleRules,
  agreementRules,
  typographyRules,
} from './rules';

// Imported LanguageTool rules (optional - for advanced users)
export {
  importedRules,
  ltGrammarRules,
  ltStyleRules,
  confusionRules,
  compoundRules,
} from './rules';

// Types
export type {
  // Spell check types
  SpellCheckResult,
  Suggestion,
  SpellCheckerOptions,
  ContentType,
  Token,
  TokenType,
  // Grammar types
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
  // Dictionary types
  Dictionary,
  CompressedDictionary,
  DictionaryLoadOptions,
  DictionaryManagerOptions,
  DictionaryStats,
  // Persistence types
  Storage,
  PersistenceOptions,
  PersistedUserDictionary,
  PersistedRuleSettings,
} from './types';
