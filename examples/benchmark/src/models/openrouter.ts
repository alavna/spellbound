import type { ModelAdapter, CheckResult } from './adapter';
import type { BenchmarkIssue } from '../types';
import {
  ISSUE_DETECTION_PROMPT,
  CORRECTION_PROMPT,
  parseIssuesFromJSON,
} from '../utils/parse-llm-response';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export class OpenRouterAdapter implements ModelAdapter {
  readonly type = 'openrouter';
  readonly isOffline = false;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  setApiKey(key: string): void {
    this.apiKey = key;
  }

  async check(text: string, model: string, signal?: AbortSignal): Promise<CheckResult> {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Spellbound Benchmark',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: ISSUE_DETECTION_PROMPT },
          { role: 'user', content: text },
        ],
        response_format: { type: 'json_object' },
      }),
      signal,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(
        (err as { error?: { message?: string } }).error?.message ||
        `OpenRouter ${response.status}`
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '{"issues":[]}';

    let issues: BenchmarkIssue[];
    try {
      issues = parseIssuesFromJSON(rawContent);
    } catch {
      issues = [];
    }

    return { issues, rawResponse: rawContent };
  }

  async correct(text: string, model: string, signal?: AbortSignal): Promise<{ correctedText: string; rawResponse?: string }> {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Spellbound Benchmark',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: CORRECTION_PROMPT },
          { role: 'user', content: text },
        ],
      }),
      signal,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(
        (err as { error?: { message?: string } }).error?.message ||
        `OpenRouter ${response.status}`
      );
    }

    const data = await response.json();
    const correctedText = data.choices?.[0]?.message?.content || text;
    return { correctedText, rawResponse: correctedText };
  }
}
