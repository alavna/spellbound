import type { SpellCheckResult, SpellCheckerOptions, Token, ContentType } from '../types';
import { DictionaryManager, createDictionaryManager } from '../dictionary/dictionary-manager';
import { Tokenizer, createTokenizer } from '../dictionary/tokenizer';
import { SuggestionEngine, createSuggestionEngine } from './suggestion-engine';

const DEFAULT_OPTIONS: Required<Omit<SpellCheckerOptions, 'dictionaryManager' | 'customWords'>> = {
  maxSuggestions: 5,
  maxEditDistance: 2,
  ignoreCase: true,
  ignoreAllCaps: true,
  ignoreWordsWithNumbers: true,
  persist: false,
  storageKey: 'spellbound:spell-checker',
  contentType: 'plain',
};

/**
 * SpellChecker - Main spell checking class
 *
 * Features:
 * - Check text for spelling errors
 * - Get suggestions for misspelled words
 * - Support for custom dictionaries
 * - Intelligent tokenization (skip URLs, emails, code blocks)
 * - Persistence of user dictionary
 */
export class SpellChecker {
  private dictionary: DictionaryManager;
  private tokenizer: Tokenizer;
  private suggestionEngine: SuggestionEngine;
  private options: Required<Omit<SpellCheckerOptions, 'dictionaryManager' | 'customWords'>>;

  constructor(options: SpellCheckerOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    // Initialize dictionary
    if (options.dictionaryManager) {
      this.dictionary = options.dictionaryManager as unknown as DictionaryManager;
    } else {
      this.dictionary = createDictionaryManager({
        ignoreCase: this.options.ignoreCase,
        persist: this.options.persist,
        storageKey: this.options.storageKey,
      });
    }

    // Add custom words
    if (options.customWords) {
      this.dictionary.addWords(options.customWords);
    }

    // Initialize tokenizer
    this.tokenizer = createTokenizer(this.options.contentType);

    // Initialize suggestion engine
    this.suggestionEngine = createSuggestionEngine({
      maxSuggestions: this.options.maxSuggestions,
      maxEditDistance: this.options.maxEditDistance,
    });
  }

  /**
   * Check text for spelling errors
   */
  check(text: string): SpellCheckResult[] {
    const results: SpellCheckResult[] = [];
    const tokens = this.tokenizer.extractWords(text);

    for (const token of tokens) {
      // Skip tokens that should be ignored
      if (this.shouldIgnore(token)) {
        continue;
      }

      const isCorrect = this.dictionary.has(token.value);

      if (!isCorrect) {
        // Get suggestions for misspelled word
        const suggestions = this.suggestionEngine.getSuggestions(token.value, this.dictionary);

        results.push({
          word: token.value,
          start: token.start,
          end: token.end,
          isCorrect: false,
          suggestions,
        });
      }
    }

    return results;
  }

  /**
   * Check a single word
   */
  checkWord(word: string): SpellCheckResult {
    const isCorrect = this.dictionary.has(word);

    const suggestions = isCorrect
      ? []
      : this.suggestionEngine.getSuggestions(word, this.dictionary);

    return {
      word,
      start: 0,
      end: word.length,
      isCorrect,
      suggestions,
    };
  }

  /**
   * Check if a word is spelled correctly
   */
  isCorrect(word: string): boolean {
    if (this.shouldIgnoreWord(word)) {
      return true;
    }
    return this.dictionary.has(word);
  }

  /**
   * Get suggestions for a word
   */
  getSuggestions(word: string): string[] {
    return this.suggestionEngine.getSuggestions(word, this.dictionary).map((s) => s.word);
  }

  /**
   * Add a word to the user dictionary
   */
  addToUserDictionary(word: string): void {
    this.dictionary.addWord(word);
  }

  /**
   * Add multiple words to the user dictionary
   */
  addWordsToUserDictionary(words: string[]): void {
    this.dictionary.addWords(words);
  }

  /**
   * Remove a word from the user dictionary
   */
  removeFromUserDictionary(word: string): void {
    this.dictionary.removeWord(word);
  }

  /**
   * Get words in the user dictionary
   */
  getUserDictionary(): string[] {
    return this.dictionary.getCustomWords();
  }

  /**
   * Clear the user dictionary
   */
  clearUserDictionary(): void {
    this.dictionary.clearCustomWords();
  }

  /**
   * Set content type for tokenization
   */
  setContentType(contentType: ContentType): void {
    this.options.contentType = contentType;
    this.tokenizer.setContentType(contentType);
  }

  /**
   * Get the underlying dictionary manager
   */
  getDictionary(): DictionaryManager {
    return this.dictionary;
  }

  /**
   * Load a dictionary
   */
  loadDictionary(dictionary: Parameters<DictionaryManager['loadDictionary']>[0]): void {
    this.dictionary.loadDictionary(dictionary);
  }

  /**
   * Determine if a token should be ignored
   */
  private shouldIgnore(token: Token): boolean {
    // Skip non-word tokens
    if (token.type !== 'word') {
      return true;
    }

    return this.shouldIgnoreWord(token.value);
  }

  /**
   * Determine if a word should be ignored
   */
  private shouldIgnoreWord(word: string): boolean {
    // Skip single characters
    if (word.length <= 1) {
      return true;
    }

    // Skip all-caps words (likely acronyms)
    if (this.options.ignoreAllCaps && word === word.toUpperCase()) {
      return true;
    }

    // Skip words with numbers
    if (this.options.ignoreWordsWithNumbers && /\d/.test(word)) {
      return true;
    }

    return false;
  }
}

/**
 * Create a spell checker instance
 */
export function createSpellChecker(options: SpellCheckerOptions = {}): SpellChecker {
  return new SpellChecker(options);
}
