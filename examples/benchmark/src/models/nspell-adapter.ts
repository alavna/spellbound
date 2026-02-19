import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let spellCheckerPromise: Promise<any> | null = null;

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSpellChecker(): Promise<any> {
  if (!spellCheckerPromise) {
    spellCheckerPromise = (async () => {
      // @ts-expect-error — nspell has no type declarations
      const nspellMod = await import('nspell');
      const NSpell = nspellMod.default || nspellMod;

      // Fetch dictionary files from CDN (dictionary-en v4 is node-only)
      const [affResp, dicResp] = await Promise.all([
        fetch('https://raw.githubusercontent.com/wooorm/dictionaries/main/dictionaries/en/index.aff'),
        fetch('https://raw.githubusercontent.com/wooorm/dictionaries/main/dictionaries/en/index.dic'),
      ]);

      const [affText, dicText] = await Promise.all([
        affResp.text(),
        dicResp.text(),
      ]);

      return NSpell(affText, dicText);
    })();
  }
  return spellCheckerPromise;
}

export class NspellAdapter implements ModelAdapter {
  readonly type = 'nspell';
  readonly isOffline = true;

  async check(text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    const checker = await getSpellChecker();
    const tokens = tokenize(text);
    const issues: BenchmarkIssue[] = [];

    for (const token of tokens) {
      if (token.word.length <= 1) continue;
      if (/^[A-Z]{2,}$/.test(token.word)) continue;

      if (!checker.correct(token.word)) {
        const suggestions: string[] = checker.suggest(token.word);
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
