import type { TestScenario } from '../types';

/** Group sentences into batches */
function groupLines(lines: string[], batchSize: number): string[][] {
  const groups: string[][] = [];
  for (let i = 0; i < lines.length; i += batchSize) {
    groups.push(lines.slice(i, i + batchSize));
  }
  return groups;
}

/**
 * Parse JFLEG parallel corpus files.
 * @param srcText Contents of the .src file (source sentences with errors)
 * @param refTexts Contents of .ref0, .ref1, .ref2, .ref3 files (reference corrections)
 */
export function parseJFLEGFiles(
  srcText: string,
  refTexts: string[],
  batchSize: number = 5
): TestScenario[] {
  const srcLines = srcText.trim().split('\n').filter((l) => l.trim());
  const refLineArrays = refTexts.map((rt) =>
    rt.trim().split('\n').filter((l) => l.trim())
  );

  // Verify alignment
  for (const refLines of refLineArrays) {
    if (refLines.length !== srcLines.length) {
      console.warn(
        `JFLEG reference file has ${refLines.length} lines but source has ${srcLines.length}`
      );
    }
  }

  const groups = groupLines(srcLines, batchSize);
  const scenarios: TestScenario[] = [];

  for (let groupIdx = 0; groupIdx < groups.length; groupIdx++) {
    const group = groups[groupIdx];
    const startIdx = groupIdx * batchSize;

    // Build per-sentence references
    const references: string[][] = [];
    for (let i = 0; i < group.length; i++) {
      const sentIdx = startIdx + i;
      const sentRefs: string[] = [];
      for (const refLines of refLineArrays) {
        if (sentIdx < refLines.length) {
          sentRefs.push(refLines[sentIdx]);
        }
      }
      references.push(sentRefs);
    }

    scenarios.push({
      id: `jfleg-${groupIdx + 1}`,
      title: `JFLEG Batch ${groupIdx + 1}`,
      description: `Sentences ${startIdx + 1}-${Math.min(startIdx + batchSize, srcLines.length)} from JFLEG (evaluated with GLEU)`,
      source: 'jfleg',
      paragraphs: group,
      expectedIssues: [], // JFLEG uses GLEU, not issue-level matching
      references,
    });
  }

  return scenarios;
}
