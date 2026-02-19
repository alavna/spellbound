import type { BenchmarkIssue, ExpectedIssue, BenchmarkResult } from '../types';

/**
 * Match detected issues to expected issues using type + text overlap.
 * Returns [truePositives, falsePositives, falseNegatives].
 */
export function matchIssues(
  detected: BenchmarkIssue[],
  expected: ExpectedIssue[]
): { tp: number; fp: number; fn: number } {
  const matchedExpected = new Set<number>();
  const matchedDetected = new Set<number>();

  for (let d = 0; d < detected.length; d++) {
    const det = detected[d];

    for (let e = 0; e < expected.length; e++) {
      if (matchedExpected.has(e)) continue;

      const exp = expected[e];

      // Check type compatibility
      if (!isTypeCompatible(det.type, exp.type)) continue;

      // Check text overlap
      if (hasTextOverlap(det.originalText, exp.originalText)) {
        matchedExpected.add(e);
        matchedDetected.add(d);
        break;
      }
    }
  }

  return {
    tp: matchedDetected.size,
    fp: detected.length - matchedDetected.size,
    fn: expected.length - matchedExpected.size,
  };
}

/** Types are compatible if they match, or if grammar/punctuation overlap */
function isTypeCompatible(
  detectedType: BenchmarkIssue['type'],
  expectedType: ExpectedIssue['type']
): boolean {
  if (detectedType === expectedType) return true;
  // Allow some cross-matching for borderline cases
  const compatGroups: Record<string, string[]> = {
    grammar: ['grammar', 'punctuation'],
    punctuation: ['punctuation', 'grammar'],
    spelling: ['spelling'],
    style: ['style', 'tone', 'clarity'],
    tone: ['tone', 'style'],
    clarity: ['clarity', 'style'],
    consistency: ['consistency'],
    cliche: ['cliche'],
    bias: ['bias'],
  };
  return compatGroups[detectedType]?.includes(expectedType) ?? false;
}

/** Check if detected text overlaps with expected text (case-insensitive) */
function hasTextOverlap(detectedText: string, expectedText: string): boolean {
  const det = detectedText.toLowerCase().trim();
  const exp = expectedText.toLowerCase().trim();

  if (det === exp) return true;
  if (det.includes(exp)) return true;
  if (exp.includes(det)) return true;

  // Check for word-level overlap (at least one word matches)
  const detWords = new Set(det.split(/\s+/));
  const expWords = exp.split(/\s+/);
  return expWords.some((w) => detWords.has(w));
}

/**
 * F0.5 score — standard GEC metric.
 * Weights precision 2x over recall: (1.25 * P * R) / (0.25 * P + R)
 */
export function calculateF05(precision: number, recall: number): number {
  if (precision === 0 && recall === 0) return 0;
  return (1.25 * precision * recall) / (0.25 * precision + recall);
}

/** Calculate precision from TP and FP */
export function calculatePrecision(tp: number, fp: number): number {
  if (tp + fp === 0) return 1; // No detections = perfect precision
  return tp / (tp + fp);
}

/** Calculate recall from TP and FN */
export function calculateRecall(tp: number, fn: number): number {
  if (tp + fn === 0) return 1; // No expected issues = perfect recall
  return tp / (tp + fn);
}

/** Evaluate a single model+scenario pair */
export function evaluateResult(
  detected: BenchmarkIssue[],
  expected: ExpectedIssue[],
  latencyMs: number,
  modelId: string,
  scenarioId: string,
  rawResponse?: string,
  correctedText?: string,
  gleu?: number
): BenchmarkResult {
  const { tp, fp, fn } = matchIssues(detected, expected);
  const precision = calculatePrecision(tp, fp);
  const recall = calculateRecall(tp, fn);
  const f05 = calculateF05(precision, recall);

  return {
    modelId,
    scenarioId,
    detectedIssues: detected,
    expectedIssues: expected,
    truePositives: tp,
    falsePositives: fp,
    falseNegatives: fn,
    precision,
    recall,
    f05,
    latencyMs,
    rawResponse,
    correctedText,
    gleu,
  };
}

/**
 * GLEU calculation (sentence-level metric for JFLEG).
 * Simplified version: compute n-gram overlap between hypothesis and references.
 */
export function calculateGLEU(
  source: string,
  hypothesis: string,
  references: string[]
): number {
  if (references.length === 0) return 0;

  const scores = references.map((ref) => {
    const hypNgrams = getNgrams(hypothesis, 4);
    const refNgrams = getNgrams(ref, 4);
    const srcNgrams = getNgrams(source, 4);

    // Count matches (ngrams in hypothesis that are in reference but not in source,
    // or are in both reference and source)
    let matchCount = 0;
    let totalHyp = 0;

    for (const [ngram, count] of hypNgrams) {
      const refCount = refNgrams.get(ngram) || 0;
      const srcCount = srcNgrams.get(ngram) || 0;

      // An ngram is a "good" correction if it's in the reference
      const matched = Math.min(count, refCount);
      matchCount += matched;
      totalHyp += count;

      // Penalize ngrams that were in source but not in reference (should have been changed)
      if (srcCount > 0 && refCount === 0) {
        // This ngram should have been removed/changed
      }
    }

    if (totalHyp === 0) return 0;
    const precision = matchCount / totalHyp;

    // Also compute recall against reference
    let refTotal = 0;
    let refMatched = 0;
    for (const [ngram, count] of refNgrams) {
      const hypCount = hypNgrams.get(ngram) || 0;
      refMatched += Math.min(count, hypCount);
      refTotal += count;
    }
    const recall = refTotal === 0 ? 0 : refMatched / refTotal;

    // GLEU is min(precision, recall)
    return Math.min(precision, recall);
  });

  // Average across references
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/** Extract n-grams up to order n */
function getNgrams(text: string, maxN: number): Map<string, number> {
  const tokens = text.toLowerCase().split(/\s+/).filter((t) => t.length > 0);
  const ngrams = new Map<string, number>();

  for (let n = 1; n <= maxN; n++) {
    for (let i = 0; i <= tokens.length - n; i++) {
      const ngram = tokens.slice(i, i + n).join(' ');
      ngrams.set(ngram, (ngrams.get(ngram) || 0) + 1);
    }
  }

  return ngrams;
}
