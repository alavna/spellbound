import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue, IssueType } from '../types';

const DEFAULT_GECTOR_URL = 'http://localhost:8020';

export class GECToRAdapter implements ModelAdapter {
  readonly type = 'gector';
  readonly isOffline = false; // HTTP-based sidecar
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || DEFAULT_GECTOR_URL;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  async healthCheck(signal?: AbortSignal): Promise<boolean> {
    try {
      const resp = await fetch(`${this.baseUrl}/health`, { signal });
      return resp.ok;
    } catch {
      return false;
    }
  }

  async check(text: string, model: string, signal?: AbortSignal): Promise<CheckResult> {
    const response = await fetch(`${this.baseUrl}/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model }),
      signal,
    });

    if (!response.ok) {
      const err = await response.text().catch(() => '');
      throw new Error(`GECToR ${response.status}: ${err}`);
    }

    const data = await response.json();
    const rawIssues = data.issues || [];

    const issues: BenchmarkIssue[] = rawIssues.map(
      (issue: {
        type: string;
        severity: string;
        original_text: string;
        replacement: string;
        message: string;
        offset_start: number;
        offset_end: number;
      }): BenchmarkIssue => ({
        type: (issue.type || 'grammar') as IssueType,
        severity: (issue.severity || 'error') as BenchmarkIssue['severity'],
        originalText: issue.original_text || '',
        replacement: issue.replacement || '',
        message: issue.message || '',
        offsetStart: issue.offset_start ?? 0,
        offsetEnd: issue.offset_end ?? 0,
      })
    );

    return { issues, rawResponse: JSON.stringify(data, null, 2) };
  }

  async correct(text: string, model: string, signal?: AbortSignal): Promise<{ correctedText: string; rawResponse?: string }> {
    const response = await fetch(`${this.baseUrl}/correct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, model }),
      signal,
    });

    if (!response.ok) {
      const err = await response.text().catch(() => '');
      throw new Error(`GECToR ${response.status}: ${err}`);
    }

    const data = await response.json();
    return { correctedText: data.corrected_text || text, rawResponse: JSON.stringify(data) };
  }
}
