/**
 * Interface for dictionary data
 */
export interface Dictionary {
  /** Language code (e.g., 'en-us', 'en-gb') */
  language: string;
  /** Dictionary name */
  name: string;
  /** Check if a word exists */
  has(word: string): boolean;
  /** Get word frequency (higher = more common), returns 0 if not found */
  getFrequency(word: string): number;
  /** Get all words (for iteration) */
  getWords(): Iterable<string>;
  /** Get total word count */
  size: number;
}

/**
 * Compressed dictionary format for efficient storage
 */
export interface CompressedDictionary {
  /** Format version */
  version: 1;
  /** Language code */
  language: string;
  /** Dictionary name */
  name: string;
  /**
   * Words array - can be:
   * - Simple array of strings (no frequency data)
   * - Array of [word, frequency] tuples
   */
  words: string[] | [string, number][];
  /** Whether the words array contains frequency data */
  hasFrequency: boolean;
  /** Optional metadata */
  metadata?: {
    source?: string;
    wordCount?: number;
    createdAt?: string;
  };
}

/**
 * Options for loading dictionaries
 */
export interface DictionaryLoadOptions {
  /** Whether to merge with existing words or replace */
  merge?: boolean;
  /** Base frequency to assign if not provided */
  defaultFrequency?: number;
}

/**
 * Options for the dictionary manager
 */
export interface DictionaryManagerOptions {
  /** Initial dictionaries to load */
  dictionaries?: CompressedDictionary[];
  /** Custom words to add */
  customWords?: string[];
  /** Persist custom words to localStorage */
  persist?: boolean;
  /** Storage key for persistence */
  storageKey?: string;
  /** Whether to ignore case for lookups */
  ignoreCase?: boolean;
}

/**
 * Statistics about the dictionary
 */
export interface DictionaryStats {
  /** Total number of words */
  totalWords: number;
  /** Number of custom words added */
  customWords: number;
  /** Loaded dictionary names */
  loadedDictionaries: string[];
  /** Memory usage estimate in bytes */
  memoryEstimate: number;
}
