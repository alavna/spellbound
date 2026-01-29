import type {
  Dictionary,
  CompressedDictionary,
  DictionaryManagerOptions,
  DictionaryLoadOptions,
  DictionaryStats,
} from '../types';
import { Trie } from '../algorithms/trie';
import { BKTree } from '../algorithms/bk-tree';

const DEFAULT_STORAGE_KEY = 'spellbound:user-dictionary';
const DEFAULT_FREQUENCY = 1;

/**
 * DictionaryManager handles loading, managing, and querying word dictionaries.
 * Supports multiple dictionaries, custom words, and persistence.
 */
export class DictionaryManager implements Dictionary {
  private trie: Trie;
  private bkTree: BKTree;
  private customWords: Set<string>;
  private loadedDictionaries: string[];
  private ignoreCase: boolean;
  private persist: boolean;
  private storageKey: string;

  constructor(options: DictionaryManagerOptions = {}) {
    this.trie = new Trie();
    this.bkTree = new BKTree();
    this.customWords = new Set();
    this.loadedDictionaries = [];
    this.ignoreCase = options.ignoreCase ?? true;
    this.persist = options.persist ?? false;
    this.storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;

    // Load initial dictionaries
    if (options.dictionaries) {
      for (const dict of options.dictionaries) {
        this.loadDictionary(dict);
      }
    }

    // Load persisted custom words
    if (this.persist) {
      this.loadPersistedWords();
    }

    // Add custom words from options
    if (options.customWords) {
      this.addWords(options.customWords);
    }
  }

  /**
   * Dictionary language (returns the first loaded dictionary's language or 'custom')
   */
  get language(): string {
    return this.loadedDictionaries[0] ?? 'custom';
  }

  /**
   * Dictionary name
   */
  get name(): string {
    return this.loadedDictionaries.join(', ') || 'Custom Dictionary';
  }

  /**
   * Total number of words
   */
  get size(): number {
    return this.trie.size;
  }

  /**
   * Load a compressed dictionary
   */
  loadDictionary(data: CompressedDictionary, options: DictionaryLoadOptions = {}): void {
    const { merge = true, defaultFrequency = DEFAULT_FREQUENCY } = options;

    if (!merge) {
      this.trie.clear();
    }

    const words = data.words;

    if (data.hasFrequency) {
      // Words with frequency data: [word, frequency][]
      for (const item of words as [string, number][]) {
        const [word, frequency] = item;
        const normalizedWord = this.normalizeWord(word);
        this.trie.insert(normalizedWord, frequency);
        this.bkTree.insert(normalizedWord, frequency);
      }
    } else {
      // Simple word list
      for (const word of words as string[]) {
        const normalizedWord = this.normalizeWord(word);
        this.trie.insert(normalizedWord, defaultFrequency);
        this.bkTree.insert(normalizedWord, defaultFrequency);
      }
    }

    this.loadedDictionaries.push(data.name);
  }

  /**
   * Check if a word exists in the dictionary
   */
  has(word: string): boolean {
    const normalizedWord = this.normalizeWord(word);
    return this.trie.has(normalizedWord);
  }

  /**
   * Get word frequency (0 if not found)
   */
  getFrequency(word: string): number {
    const normalizedWord = this.normalizeWord(word);
    return this.trie.getFrequency(normalizedWord);
  }

  /**
   * Get all words (iterator)
   */
  getWords(): Iterable<string> {
    return this.trie.getAllWords();
  }

  /**
   * Add words to the custom dictionary
   */
  addWords(words: string[]): void {
    for (const word of words) {
      const normalizedWord = this.normalizeWord(word);
      this.trie.insert(normalizedWord, DEFAULT_FREQUENCY);
      this.bkTree.insert(normalizedWord, DEFAULT_FREQUENCY);
      this.customWords.add(normalizedWord);
    }

    if (this.persist) {
      this.persistWords();
    }
  }

  /**
   * Add a single word to the custom dictionary
   */
  addWord(word: string): void {
    this.addWords([word]);
  }

  /**
   * Remove words from the custom dictionary
   * Note: Only removes from custom words, not from loaded dictionaries
   */
  removeWords(words: string[]): void {
    for (const word of words) {
      const normalizedWord = this.normalizeWord(word);
      if (this.customWords.has(normalizedWord)) {
        this.trie.remove(normalizedWord);
        this.customWords.delete(normalizedWord);
      }
    }

    if (this.persist) {
      this.persistWords();
    }
  }

  /**
   * Remove a single word from the custom dictionary
   */
  removeWord(word: string): void {
    this.removeWords([word]);
  }

  /**
   * Check if a word is a custom word
   */
  isCustomWord(word: string): boolean {
    const normalizedWord = this.normalizeWord(word);
    return this.customWords.has(normalizedWord);
  }

  /**
   * Get suggestions for a misspelled word using BK-tree
   */
  getSuggestions(
    word: string,
    maxDistance: number = 2,
    limit: number = 5
  ): Array<{ word: string; distance: number; frequency: number }> {
    const normalizedWord = this.normalizeWord(word);
    return this.bkTree.search(normalizedWord, maxDistance).slice(0, limit);
  }

  /**
   * Get suggestions using Trie (faster but less flexible)
   */
  getSuggestionsFast(
    word: string,
    maxDistance: number = 2,
    limit: number = 5
  ): Array<{ word: string; distance: number; frequency: number }> {
    const normalizedWord = this.normalizeWord(word);
    return this.trie.findWithinEditDistance(normalizedWord, maxDistance, limit);
  }

  /**
   * Find words with a given prefix (for autocomplete)
   */
  findWordsWithPrefix(prefix: string, limit: number = 10): string[] {
    const normalizedPrefix = this.normalizeWord(prefix);
    return this.trie.findWordsWithPrefix(normalizedPrefix, limit);
  }

  /**
   * Get custom words list
   */
  getCustomWords(): string[] {
    return Array.from(this.customWords);
  }

  /**
   * Clear custom words
   */
  clearCustomWords(): void {
    for (const word of this.customWords) {
      this.trie.remove(word);
    }
    this.customWords.clear();

    if (this.persist) {
      this.persistWords();
    }
  }

  /**
   * Get dictionary statistics
   */
  getStats(): DictionaryStats {
    return {
      totalWords: this.trie.size,
      customWords: this.customWords.size,
      loadedDictionaries: [...this.loadedDictionaries],
      // Rough estimate: ~50 bytes per word on average
      memoryEstimate: this.trie.size * 50,
    };
  }

  /**
   * Normalize a word (lowercase if ignoreCase is true)
   */
  private normalizeWord(word: string): string {
    return this.ignoreCase ? word.toLowerCase() : word;
  }

  /**
   * Load persisted custom words from storage
   */
  private loadPersistedWords(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === 1 && Array.isArray(data.words)) {
          for (const word of data.words) {
            const normalizedWord = this.normalizeWord(word);
            this.trie.insert(normalizedWord, DEFAULT_FREQUENCY);
            this.bkTree.insert(normalizedWord, DEFAULT_FREQUENCY);
            this.customWords.add(normalizedWord);
          }
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Persist custom words to storage
   */
  private persistWords(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const data = {
        version: 1,
        words: Array.from(this.customWords),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {
      // Ignore storage errors (quota exceeded, etc.)
    }
  }
}

/**
 * Create a dictionary manager instance
 */
export function createDictionaryManager(options: DictionaryManagerOptions = {}): DictionaryManager {
  return new DictionaryManager(options);
}
