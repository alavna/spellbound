import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue } from '../types';
import {
  ISSUE_DETECTION_PROMPT,
  CORRECTION_PROMPT,
  parseIssuesFromJSON,
} from '../utils/parse-llm-response';

const DEFAULT_OLLAMA_URL = 'http://localhost:11434';

export class OllamaAdapter implements ModelAdapter {
  readonly type = 'ollama';
  readonly isOffline = false; // HTTP-based, runs with concurrency
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || DEFAULT_OLLAMA_URL;
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /** Health check — also returns list of locally available models */
  async healthCheck(signal?: AbortSignal): Promise<{ ok: boolean; models: string[] }> {
    try {
      const resp = await fetch(`${this.baseUrl}/api/tags`, { signal });
      if (!resp.ok) return { ok: false, models: [] };
      const data = await resp.json();
      const models = (data.models || []).map((m: { name: string }) => m.name);
      return { ok: true, models };
    } catch {
      return { ok: false, models: [] };
    }
  }

  async check(text: string, model: string, signal?: AbortSignal): Promise<CheckResult> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: ISSUE_DETECTION_PROMPT },
          { role: 'user', content: text },
        ],
        format: 'json',
        stream: false,
      }),
      signal,
    });

    if (!response.ok) {
      const err = await response.text().catch(() => '');
      throw new Error(`Ollama ${response.status}: ${err}`);
    }

    const data = await response.json();
    const rawContent = data.message?.content || '{"issues":[]}';

    let issues: BenchmarkIssue[];
    try {
      issues = parseIssuesFromJSON(rawContent);
    } catch {
      issues = [];
    }

    return { issues, rawResponse: rawContent };
  }

  async correct(text: string, model: string, signal?: AbortSignal): Promise<{ correctedText: string; rawResponse?: string }> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: CORRECTION_PROMPT },
          { role: 'user', content: text },
        ],
        stream: false,
      }),
      signal,
    });

    if (!response.ok) {
      const err = await response.text().catch(() => '');
      throw new Error(`Ollama ${response.status}: ${err}`);
    }

    const data = await response.json();
    const correctedText = data.message?.content || text;
    return { correctedText, rawResponse: correctedText };
  }
}
