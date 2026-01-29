import type { CompressedDictionary } from '../types';

/**
 * Load a dictionary from a URL
 */
export async function loadDictionaryFromUrl(url: string): Promise<CompressedDictionary> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load dictionary from ${url}: ${response.statusText}`);
  }

  const data = await response.json();
  return validateDictionary(data);
}

/**
 * Load a dictionary from a JSON string
 */
export function loadDictionaryFromJson(json: string): CompressedDictionary {
  const data = JSON.parse(json);
  return validateDictionary(data);
}

/**
 * Load a dictionary from a plain text word list (one word per line)
 */
export function loadDictionaryFromWordList(
  text: string,
  options: {
    language?: string;
    name?: string;
    separator?: string | RegExp;
  } = {}
): CompressedDictionary {
  const { language = 'en', name = 'Custom Dictionary', separator = /[\n\r]+/ } = options;

  const words = text
    .split(separator)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  return {
    version: 1,
    language,
    name,
    words,
    hasFrequency: false,
  };
}

/**
 * Load a dictionary with word frequencies from CSV/TSV format
 * Expected format: word,frequency or word\tfrequency
 */
export function loadDictionaryFromCsv(
  text: string,
  options: {
    language?: string;
    name?: string;
    delimiter?: string;
    hasHeader?: boolean;
  } = {}
): CompressedDictionary {
  const {
    language = 'en',
    name = 'Custom Dictionary',
    delimiter = ',',
    hasHeader = false,
  } = options;

  const lines = text.split(/[\n\r]+/).filter((line) => line.trim().length > 0);

  // Skip header if present
  const startIndex = hasHeader ? 1 : 0;

  const words: [string, number][] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const parts = lines[i].split(delimiter);
    if (parts.length >= 2) {
      const word = parts[0].trim();
      const frequency = parseInt(parts[1].trim(), 10);
      if (word && !isNaN(frequency)) {
        words.push([word, frequency]);
      }
    } else if (parts.length === 1) {
      const word = parts[0].trim();
      if (word) {
        words.push([word, 1]);
      }
    }
  }

  return {
    version: 1,
    language,
    name,
    words,
    hasFrequency: true,
  };
}

/**
 * Create an empty dictionary structure
 */
export function createEmptyDictionary(language: string, name: string): CompressedDictionary {
  return {
    version: 1,
    language,
    name,
    words: [],
    hasFrequency: false,
  };
}

/**
 * Validate dictionary data structure
 */
function validateDictionary(data: unknown): CompressedDictionary {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid dictionary: expected an object');
  }

  const dict = data as Record<string, unknown>;

  if (dict.version !== 1) {
    throw new Error(`Invalid dictionary version: ${dict.version}`);
  }

  if (typeof dict.language !== 'string') {
    throw new Error('Invalid dictionary: missing language');
  }

  if (typeof dict.name !== 'string') {
    throw new Error('Invalid dictionary: missing name');
  }

  if (!Array.isArray(dict.words)) {
    throw new Error('Invalid dictionary: words must be an array');
  }

  return dict as unknown as CompressedDictionary;
}

/**
 * Compress a dictionary by removing low-frequency words
 */
export function compressDictionary(
  dict: CompressedDictionary,
  minFrequency: number
): CompressedDictionary {
  if (!dict.hasFrequency) {
    return dict;
  }

  const words = (dict.words as [string, number][]).filter(([, freq]) => freq >= minFrequency);

  return {
    ...dict,
    words,
    metadata: {
      ...dict.metadata,
      wordCount: words.length,
    },
  };
}

/**
 * Merge multiple dictionaries into one
 */
export function mergeDictionaries(
  dictionaries: CompressedDictionary[],
  options: {
    name?: string;
    language?: string;
  } = {}
): CompressedDictionary {
  const wordMap = new Map<string, number>();

  for (const dict of dictionaries) {
    if (dict.hasFrequency) {
      for (const [word, freq] of dict.words as [string, number][]) {
        const existing = wordMap.get(word) || 0;
        wordMap.set(word, Math.max(existing, freq));
      }
    } else {
      for (const word of dict.words as string[]) {
        if (!wordMap.has(word)) {
          wordMap.set(word, 1);
        }
      }
    }
  }

  const words: [string, number][] = Array.from(wordMap.entries());

  return {
    version: 1,
    language: options.language || dictionaries[0]?.language || 'en',
    name: options.name || 'Merged Dictionary',
    words,
    hasFrequency: true,
    metadata: {
      wordCount: words.length,
      createdAt: new Date().toISOString(),
    },
  };
}
