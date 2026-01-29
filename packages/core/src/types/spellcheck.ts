/**
 * Result of checking a single word for spelling errors
 */
export interface SpellCheckResult {
  /** The word that was checked */
  word: string;
  /** Start position in the original text (0-indexed) */
  start: number;
  /** End position in the original text (exclusive) */
  end: number;
  /** Whether the word is spelled correctly */
  isCorrect: boolean;
  /** Suggested corrections, ordered by likelihood */
  suggestions: Suggestion[];
}

/**
 * A suggested correction for a misspelled word
 */
export interface Suggestion {
  /** The suggested word */
  word: string;
  /** Edit distance from the original word */
  distance: number;
  /** Confidence score (0-1), higher is better */
  score: number;
}

/**
 * Options for the spell checker
 */
export interface SpellCheckerOptions {
  /** Maximum number of suggestions to return per word */
  maxSuggestions?: number;
  /** Maximum edit distance for suggestions (1-3 recommended) */
  maxEditDistance?: number;
  /** Whether to ignore case when checking words */
  ignoreCase?: boolean;
  /** Whether to ignore words that are all uppercase (e.g., acronyms) */
  ignoreAllCaps?: boolean;
  /** Whether to ignore words that contain numbers */
  ignoreWordsWithNumbers?: boolean;
  /** Custom words to add to the dictionary */
  customWords?: string[];
  /** Persist user dictionary to localStorage */
  persist?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
  /** Content type for smart tokenization */
  contentType?: ContentType;
  /** External dictionary manager instance */
  dictionaryManager?: unknown;
}

/**
 * Content type for intelligent tokenization
 */
export type ContentType = 'plain' | 'markdown' | 'html';

/**
 * A token extracted from text
 */
export interface Token {
  /** The token value */
  value: string;
  /** Start position in original text */
  start: number;
  /** End position in original text (exclusive) */
  end: number;
  /** Type of token */
  type: TokenType;
}

/**
 * Types of tokens
 */
export type TokenType =
  | 'word'
  | 'punctuation'
  | 'whitespace'
  | 'number'
  | 'url'
  | 'email'
  | 'code'
  | 'hashtag'
  | 'mention';
