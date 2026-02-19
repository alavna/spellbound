import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue, IssueType } from '../types';
import type { Linter, Lint } from 'harper.js';

let linterInstance: Linter | null = null;
let linterReady: Promise<Linter> | null = null;

/** Map harper.js lint_kind() string to our issue types */
function mapLintKind(kind: string): IssueType {
  const lower = kind.toLowerCase();
  if (lower.includes('spell') || lower === 'misspelled_word') return 'spelling';
  if (lower.includes('capitaliz')) return 'grammar';
  if (lower.includes('punctuat') || lower.includes('comma') || lower.includes('apostrophe')
    || lower.includes('quote') || lower.includes('number_suffix')) return 'punctuation';
  if (lower.includes('repeti') || lower.includes('wordi') || lower.includes('redundan')
    || lower.includes('boring') || lower.includes('long_sentence')) return 'style';
  return 'grammar';
}

function severityFor(type: IssueType): BenchmarkIssue['severity'] {
  if (type === 'spelling' || type === 'grammar' || type === 'punctuation') return 'error';
  if (type === 'style') return 'warning';
  return 'info';
}

async function getLinter(): Promise<Linter> {
  if (linterInstance) return linterInstance;
  if (linterReady) return linterReady;

  linterReady = (async () => {
    const harper = await import('harper.js');
    // WorkerLinter runs in a Web Worker (non-blocking), preferred in browser
    const linter = new harper.WorkerLinter({ binary: harper.binary });
    await linter.setup();
    linterInstance = linter;
    return linter;
  })();

  return linterReady;
}

export class HarperAdapter implements ModelAdapter {
  readonly type = 'harper';
  readonly isOffline = true;

  async check(text: string, _model: string, _signal?: AbortSignal): Promise<CheckResult> {
    const linter = await getLinter();
    const lints: Lint[] = await linter.lint(text, { language: 'plaintext' });
    const issues: BenchmarkIssue[] = [];

    for (const lint of lints) {
      const kind = lint.lint_kind();
      const issueType = mapLintKind(kind);
      const span = lint.span();
      const start = span.start;
      const end = span.end;
      const originalText = text.slice(start, end);
      const suggestions = lint.suggestions();
      const replacement = suggestions.length > 0 ? suggestions[0].get_replacement_text() : '';
      const message = lint.message();

      issues.push({
        type: issueType,
        severity: severityFor(issueType),
        originalText,
        replacement,
        message: message || `${kind}: ${originalText}`,
        offsetStart: start,
        offsetEnd: end,
      });
    }

    return { issues };
  }
}
