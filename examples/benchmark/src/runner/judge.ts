import type { BenchmarkIssue, JudgedIssue, JudgedResult } from '../types';

const JUDGE_PROMPT = `You are an expert language evaluator. For each detected issue below, evaluate:
1. **isValid**: Is this a real issue in the text? (true/false)
2. **categoryAccurate**: Is the issue categorized correctly (spelling/grammar/punctuation/style/tone)? (true/false)
3. **fixAccurate**: Is the suggested fix correct? (true/false)
4. **notes**: Brief explanation of your evaluation.

Return JSON:
{"evaluations":[{"index":0,"isValid":true,"categoryAccurate":true,"fixAccurate":true,"notes":"Correct identification"}]}`;

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export interface JudgeConfig {
  apiKey: string;
  model: string; // Default: "openai/gpt-4o"
}

/**
 * Use an LLM judge to evaluate detected issues for a single scenario.
 */
export async function judgeIssues(
  text: string,
  issues: BenchmarkIssue[],
  modelId: string,
  scenarioId: string,
  config: JudgeConfig,
  signal?: AbortSignal
): Promise<JudgedResult> {
  if (issues.length === 0) {
    return {
      modelId,
      scenarioId,
      judgedIssues: [],
      overallAccuracy: 1,
    };
  }

  const issueList = issues
    .map(
      (issue, idx) =>
        `${idx}. [${issue.type}] "${issue.originalText}" → "${issue.replacement}" (${issue.message})`
    )
    .join('\n');

  const userMessage = `## Original Text:\n${text}\n\n## Detected Issues:\n${issueList}`;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Spellbound Benchmark Judge',
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: JUDGE_PROMPT },
        { role: 'user', content: userMessage },
      ],
      response_format: { type: 'json_object' },
    }),
    signal,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } }).error?.message ||
      `Judge API error ${response.status}`
    );
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content || '{"evaluations":[]}';

  let evaluations: Array<{
    index: number;
    isValid: boolean;
    categoryAccurate: boolean;
    fixAccurate: boolean;
    notes: string;
  }>;

  try {
    const parsed = JSON.parse(rawContent);
    evaluations = parsed.evaluations || [];
  } catch {
    evaluations = [];
  }

  const judgedIssues: JudgedIssue[] = issues.map((issue, idx) => {
    const evaluation = evaluations.find((e) => e.index === idx);
    return {
      issue,
      isValid: evaluation?.isValid ?? false,
      categoryAccurate: evaluation?.categoryAccurate ?? false,
      fixAccurate: evaluation?.fixAccurate ?? false,
      notes: evaluation?.notes ?? 'No evaluation available',
    };
  });

  const validCount = judgedIssues.filter((j) => j.isValid).length;
  const overallAccuracy = issues.length > 0 ? validCount / issues.length : 1;

  return {
    modelId,
    scenarioId,
    judgedIssues,
    overallAccuracy,
  };
}
