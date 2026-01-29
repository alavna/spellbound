import type { CompressedDictionary } from '@spellbound/core';
import wordsData from '../data/words.json';

/**
 * US English dictionary data
 */
export const dictionary: CompressedDictionary = wordsData as unknown as CompressedDictionary;

/**
 * Load the US English dictionary asynchronously
 * Useful for lazy-loading to reduce initial bundle size
 */
export async function loadDictionary(): Promise<CompressedDictionary> {
  return dictionary;
}

/**
 * Dictionary metadata
 */
export const metadata = {
  language: dictionary.language,
  name: dictionary.name,
  wordCount: dictionary.words.length,
};

export default dictionary;
