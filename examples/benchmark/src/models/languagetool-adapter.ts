import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue, IssueType } from '../types';

const DEFAULT_LT_URL = 'http://localhost:8010';

/** Map LanguageTool rule category IDs to our issue types */
function mapCategoryId(categoryId: string): IssueType {
  switch (categoryId) {
    case 'TYPOS':
    case 'COMPOUNDING':
      return 'spelling';
    case 'GRAMMAR':
    case 'MISC':
      return 'grammar';
    case 'PUNCTUATION':
    case 'TYPOGRAPHY':
      return 'punctuation';
    case 'STYLE':
    case 'REDUNDANCY':
      return 'style';
    case 'CASING':
      return 'grammar';
    default:
      return 'grammar';
  }
}

function severityFor(type: IssueType): BenchmarkIssue['severity'] {
  if (type === 'spelling' || type === 'grammar' || type === 'punctuation') return 'error';
  if (type === 'style') return 'warning';
  return 'info';
}

export class LanguageToolAdapter implements ModelAdapter {
  readonly type = 'languagetool';
  readonly isOffline = false; // HTTP-based
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || DEFAULT_LT_URL;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /** Health check for LanguageTool server */
  async healthCheck(signal?: AbortSignal): Promise<boolean> {
    try {
      const resp = await fetch(`${this.baseUrl}/v2/languages`, { signal });
      return resp.ok;
    } catch {
      return false;
    }
  }

  async check(text: string, _model: string, signal?: AbortSignal): Promise<CheckResult> {
    const body = new URLSearchParams({
      text,
      language: 'en-US',
      enabledOnly: 'false',
    });

    const response = await fetch(`${this.baseUrl}/v2/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal,
    });

    if (!response.ok) {
      const err = await response.text().catch(() => '');
      throw new Error(`LanguageTool ${response.status}: ${err}`);
    }

    const data = await response.json();
    const matches = data.matches || [];
    const issues: BenchmarkIssue[] = [];

    for (const match of matches as Array<{
      offset: number;
      length: number;
      message: string;
      replacements: Array<{ value: string }>;
      rule: { category: { id: string } };
    }>) {
      const start = match.offset;
      const end = start + match.length;
      const originalText = text.slice(start, end);
      const categoryId = match.rule?.category?.id || 'GRAMMAR';
      const issueType = mapCategoryId(categoryId);
      const replacement = match.replacements?.[0]?.value || '';

      issues.push({
        type: issueType,
        severity: severityFor(issueType),
        originalText,
        replacement,
        message: match.message || '',
        offsetStart: start,
        offsetEnd: end,
      });
    }

    return {
      issues,
      rawResponse: JSON.stringify(data, null, 2),
    };
  }
}
