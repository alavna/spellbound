import type { TestScenario, ExpectedIssue } from '../types';

/** ERRANT error type → our category mapping */
function mapErrorType(errorType: string): ExpectedIssue['type'] {
  if (errorType.includes('SPELL')) return 'spelling';
  if (errorType.includes('PUNCT')) return 'punctuation';
  if (errorType.includes('ORTH')) return 'spelling';
  // Everything else is grammar
  return 'grammar';
}

interface M2Annotation {
  startToken: number;
  endToken: number;
  errorType: string;
  correction: string;
  annotatorId: number;
}

interface M2Sentence {
  original: string;
  tokens: string[];
  annotations: M2Annotation[];
}

function parseM2Sentences(text: string): M2Sentence[] {
  const sentences: M2Sentence[] = [];
  const blocks = text.split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length === 0) continue;

    const sentLine = lines[0];
    if (!sentLine.startsWith('S ')) continue;

    const original = sentLine.substring(2);
    const tokens = original.split(' ');
    const annotations: M2Annotation[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.startsWith('A ')) continue;

      const parts = line.substring(2).split('|||');
      if (parts.length < 4) continue;

      const span = parts[0].split(' ');
      const startToken = parseInt(span[0], 10);
      const endToken = parseInt(span[1], 10);
      const errorType = parts[1].trim();
      const correction = parts[2].trim();
      const annotatorId = parseInt(parts[parts.length - 1], 10) || 0;

      // Skip noop annotations
      if (errorType === 'noop' || correction === '-NONE-') continue;

      annotations.push({ startToken, endToken, errorType, correction, annotatorId });
    }

    sentences.push({ original, tokens, annotations });
  }

  return sentences;
}

/** Group sentences into batches for manageable scenarios */
function groupSentences(sentences: M2Sentence[], batchSize: number): M2Sentence[][] {
  const groups: M2Sentence[][] = [];
  for (let i = 0; i < sentences.length; i += batchSize) {
    groups.push(sentences.slice(i, i + batchSize));
  }
  return groups;
}

export function parseM2File(
  text: string,
  source: 'conll2014' | 'bea2019',
  batchSize: number = 5
): TestScenario[] {
  const sentences = parseM2Sentences(text);
  if (sentences.length === 0) return [];

  const groups = groupSentences(sentences, batchSize);

  return groups.map((group, groupIdx): TestScenario => {
    // Build combined text and expected issues
    const paragraphs: string[] = [];
    const expectedIssues: ExpectedIssue[] = [];

    for (const sent of group) {
      paragraphs.push(sent.original);

      // Use only annotator 0's annotations
      const anns = sent.annotations.filter((a) => a.annotatorId === 0);

      for (const ann of anns) {
        const originalTokens = sent.tokens.slice(ann.startToken, ann.endToken);
        const originalText = originalTokens.join(' ');

        expectedIssues.push({
          type: mapErrorType(ann.errorType),
          originalText: originalText || '[insertion]',
          expectedFix: ann.correction,
          description: `${ann.errorType}: ${originalText || '[missing]'} → ${ann.correction}`,
        });
      }
    }

    return {
      id: `${source}-${groupIdx + 1}`,
      title: `${source.toUpperCase()} Batch ${groupIdx + 1}`,
      description: `Sentences ${groupIdx * batchSize + 1}-${Math.min((groupIdx + 1) * batchSize, sentences.length)} from ${source.toUpperCase()}`,
      source,
      paragraphs,
      expectedIssues,
    };
  });
}
