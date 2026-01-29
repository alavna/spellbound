import { phoneticSimilarity } from '../algorithms/phonetic';
import type { Suggestion } from '../types';
import type { DictionaryManager } from '../dictionary/dictionary-manager';

/**
 * Configuration for the suggestion engine
 */
export interface SuggestionEngineOptions {
  /** Maximum number of suggestions to return */
  maxSuggestions?: number;
  /** Maximum edit distance to consider */
  maxEditDistance?: number;
  /** Weight for edit distance in scoring (0-1) */
  distanceWeight?: number;
  /** Weight for word frequency in scoring (0-1) */
  frequencyWeight?: number;
  /** Weight for phonetic similarity in scoring (0-1) */
  phoneticWeight?: number;
  /** Whether to use phonetic matching */
  usePhonetic?: boolean;
}

const DEFAULT_OPTIONS: Required<SuggestionEngineOptions> = {
  maxSuggestions: 5,
  maxEditDistance: 2,
  distanceWeight: 0.5,
  frequencyWeight: 0.3,
  phoneticWeight: 0.2,
  usePhonetic: true,
};

/**
 * SuggestionEngine generates and ranks spelling suggestions.
 *
 * Ranking factors:
 * 1. Edit distance (Damerau-Levenshtein)
 * 2. Word frequency (common words rank higher)
 * 3. Phonetic similarity (words that sound similar)
 */
export class SuggestionEngine {
  private options: Required<SuggestionEngineOptions>;
  private maxFrequency: number = 1;

  constructor(options: SuggestionEngineOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    // Normalize weights to sum to 1
    const totalWeight =
      this.options.distanceWeight + this.options.frequencyWeight + this.options.phoneticWeight;

    if (totalWeight > 0) {
      this.options.distanceWeight /= totalWeight;
      this.options.frequencyWeight /= totalWeight;
      this.options.phoneticWeight /= totalWeight;
    }
  }

  /**
   * Generate suggestions for a misspelled word
   */
  getSuggestions(word: string, dictionary: DictionaryManager): Suggestion[] {
    const normalizedWord = word.toLowerCase();

    // Get candidates from dictionary within edit distance
    const candidates = dictionary.getSuggestions(
      normalizedWord,
      this.options.maxEditDistance,
      this.options.maxSuggestions * 3 // Get more candidates for better ranking
    );

    if (candidates.length === 0) {
      // Try with higher edit distance
      const moreCandidates = dictionary.getSuggestions(
        normalizedWord,
        this.options.maxEditDistance + 1,
        this.options.maxSuggestions * 2
      );
      candidates.push(...moreCandidates);
    }

    // Update max frequency for normalization
    this.maxFrequency = Math.max(this.maxFrequency, ...candidates.map((c) => c.frequency));

    // Score and rank candidates
    const scored = candidates.map((candidate) => ({
      word: this.matchCase(candidate.word, word),
      distance: candidate.distance,
      score: this.calculateScore(
        normalizedWord,
        candidate.word,
        candidate.distance,
        candidate.frequency
      ),
    }));

    // Sort by score (descending)
    scored.sort((a, b) => b.score - a.score);

    // Remove duplicates (same word, different cases)
    const seen = new Set<string>();
    const unique = scored.filter((s) => {
      const lower = s.word.toLowerCase();
      if (seen.has(lower)) {
        return false;
      }
      seen.add(lower);
      return true;
    });

    return unique.slice(0, this.options.maxSuggestions);
  }

  /**
   * Calculate a score for a suggestion (higher is better)
   */
  private calculateScore(
    original: string,
    suggestion: string,
    distance: number,
    frequency: number
  ): number {
    // Distance score (inverse - closer is better)
    // Max distance of 3 → scores: 1=0.67, 2=0.33, 3=0
    const maxDist = this.options.maxEditDistance + 1;
    const distanceScore = Math.max(0, (maxDist - distance) / maxDist);

    // Frequency score (normalized)
    const frequencyScore = this.maxFrequency > 0 ? frequency / this.maxFrequency : 0;

    // Phonetic score
    let phoneticScore = 0;
    if (this.options.usePhonetic) {
      phoneticScore = phoneticSimilarity(original, suggestion);
    }

    // Weighted combination
    const score =
      distanceScore * this.options.distanceWeight +
      frequencyScore * this.options.frequencyWeight +
      phoneticScore * this.options.phoneticWeight;

    // Bonus for exact length match
    const lengthBonus = original.length === suggestion.length ? 0.05 : 0;

    // Bonus for same first letter
    const firstLetterBonus = original[0]?.toLowerCase() === suggestion[0]?.toLowerCase() ? 0.1 : 0;

    return score + lengthBonus + firstLetterBonus;
  }

  /**
   * Match the case of the suggestion to the original word
   */
  private matchCase(suggestion: string, original: string): string {
    if (!original || !suggestion) {
      return suggestion;
    }

    // All uppercase
    if (original === original.toUpperCase()) {
      return suggestion.toUpperCase();
    }

    // Title case (first letter uppercase)
    if (original[0] === original[0].toUpperCase()) {
      return suggestion[0].toUpperCase() + suggestion.slice(1).toLowerCase();
    }

    // Default: return as-is (usually lowercase)
    return suggestion;
  }

  /**
   * Update configuration
   */
  setOptions(options: Partial<SuggestionEngineOptions>): void {
    Object.assign(this.options, options);
  }
}

/**
 * Create a suggestion engine instance
 */
export function createSuggestionEngine(options: SuggestionEngineOptions = {}): SuggestionEngine {
  return new SuggestionEngine(options);
}
