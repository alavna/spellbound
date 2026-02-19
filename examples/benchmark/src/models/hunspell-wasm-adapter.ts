import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue } from '../types';
import { createHunspellFromStrings, type Hunspell } from 'hunspell-wasm';

let hunspellPromise: Promise<Hunspell> | null = null;

/** Simple word tokenizer with position tracking */
function tokenize(text: string): Array<{ word: string; start: number; end: number }> {
  const tokens: Array<{ word: string; start: number; end: number }> = [];
  const regex = /[a-zA-Z''\u2019-]+/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    tokens.push({
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return tokens;
}

async function getHunspell(): Promise<Hunspell> {
  if (!hunspellPromise) {
    hunspellPromise = (async () => {
      // Fetch dictionary files from CDN (dictionary-en v4 uses top-level await / fs, not browser-safe)
      const [affResp, dicResp] = await Promise.all([
        fetch('https://raw.githubusercontent.com/wooorm/dictionaries/main/dictionaries/en/index.aff'),
        fetch('https://raw.githubusercontent.com/wooorm/dictionaries/main/dictionaries/en/index.dic'),
      ]);

      const [affStr, dicStr] = await Promise.all([
        affResp.text(),
        dicResp.text(),
      ]);

      return createHunspellFromStrings(affStr, dicStr);
    })();
  }
  return hunspellPromise;
}

export class HunspellWasmAdapter implements ModelAdapter {
  readonly type = 'hunspell-wasm';
  readonly isOffline = true;

  async check(text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    const hunspell = await getHunspell();
    const tokens = tokenize(text);
    const issues: BenchmarkIssue[] = [];

    for (const token of tokens) {
      if (token.word.length <= 1) continue;
      if (/^[A-Z]{2,}$/.test(token.word)) continue;

      if (!hunspell.testSpelling(token.word)) {
        const suggestions = hunspell.getSpellingSuggestions(token.word);
        issues.push({
          type: 'spelling',
          severity: 'error',
          originalText: token.word,
          replacement: suggestions[0] || '',
          message: `"${token.word}" may be misspelled`,
          offsetStart: token.start,
          offsetEnd: token.end,
        });
      }
    }

    return { issues };
  }
}
