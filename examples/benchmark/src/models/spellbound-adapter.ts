import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue } from '../types';
import { SpellChecker, GrammarChecker } from '@spellbound/core';
import type { SpellCheckResult, GrammarIssue, IssueCategory } from '@spellbound/core';
import enUSDict from '@spellbound/dict-en-us';

let spellChecker: SpellChecker | null = null;
let grammarChecker: GrammarChecker | null = null;

function ensureInitialized(): { spell: SpellChecker; grammar: GrammarChecker } {
  if (!spellChecker) {
    spellChecker = new SpellChecker({
      maxSuggestions: 5,
      maxEditDistance: 2,
    });
    spellChecker.loadDictionary(enUSDict);
  }
  if (!grammarChecker) {
    grammarChecker = new GrammarChecker();
  }
  return { spell: spellChecker, grammar: grammarChecker };
}

function mapCategoryToType(category: IssueCategory): BenchmarkIssue['type'] {
  switch (category) {
    case 'spelling':
      return 'spelling';
    case 'punctuation':
    case 'typography':
      return 'punctuation';
    case 'style':
    case 'repetition':
      return 'style';
    case 'capitalization':
    case 'grammar':
    case 'custom':
    default:
      return 'grammar';
  }
}

function spellResultToIssue(result: SpellCheckResult): BenchmarkIssue {
  return {
    type: 'spelling',
    severity: 'error',
    originalText: result.word,
    replacement: result.suggestions.length > 0 ? result.suggestions[0].word : '',
    message: `"${result.word}" may be misspelled`,
    offsetStart: result.start,
    offsetEnd: result.end,
  };
}

function grammarIssueToIssue(issue: GrammarIssue): BenchmarkIssue {
  return {
    type: mapCategoryToType(issue.category),
    severity: issue.severity,
    originalText: issue.match,
    replacement: issue.replacements.length > 0 ? issue.replacements[0] : '',
    message: issue.message,
    offsetStart: issue.start,
    offsetEnd: issue.end,
  };
}

export class SpellboundAdapter implements ModelAdapter {
  readonly type = 'spellbound';
  readonly isOffline = true;

  async check(text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    const { spell, grammar } = ensureInitialized();

    const issues: BenchmarkIssue[] = [];

    // Spell check
    const spellingResults = spell.check(text);
    for (const result of spellingResults) {
      if (!result.isCorrect) {
        issues.push(spellResultToIssue(result));
      }
    }

    // Grammar check
    const grammarResult = grammar.check(text);
    for (const issue of grammarResult.issues) {
      issues.push(grammarIssueToIssue(issue));
    }

    // Sort by offset and deduplicate same position
    issues.sort((a, b) => a.offsetStart - b.offsetStart);
    const unique = issues.filter(
      (issue, index, self) =>
        index === self.findIndex(
          (i) => i.offsetStart === issue.offsetStart && i.offsetEnd === issue.offsetEnd
        )
    );

    return { issues: unique };
  }
}
