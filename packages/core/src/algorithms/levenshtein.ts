/**
 * Calculate the Levenshtein distance between two strings.
 * This is the minimum number of single-character edits (insertions, deletions, substitutions)
 * required to change one string into the other.
 *
 * Time complexity: O(m * n) where m and n are the lengths of the strings
 * Space complexity: O(min(m, n)) using optimized single-row approach
 */
export function levenshtein(a: string, b: string): number {
  // Handle edge cases
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Ensure a is the shorter string for space optimization
  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  const aLen = a.length;
  const bLen = b.length;

  // Use single row optimization
  let prevRow = new Array<number>(aLen + 1);
  let currRow = new Array<number>(aLen + 1);

  // Initialize first row
  for (let i = 0; i <= aLen; i++) {
    prevRow[i] = i;
  }

  // Fill in the rest of the matrix
  for (let j = 1; j <= bLen; j++) {
    currRow[0] = j;

    for (let i = 1; i <= aLen; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currRow[i] = Math.min(
        prevRow[i] + 1, // deletion
        currRow[i - 1] + 1, // insertion
        prevRow[i - 1] + cost // substitution
      );
    }

    // Swap rows
    [prevRow, currRow] = [currRow, prevRow];
  }

  return prevRow[aLen];
}

/**
 * Calculate the Damerau-Levenshtein distance between two strings.
 * This extends Levenshtein distance by also allowing transpositions
 * (swapping two adjacent characters).
 *
 * This catches common typos like "teh" -> "the"
 *
 * Time complexity: O(m * n)
 * Space complexity: O(m * n)
 */
export function damerauLevenshtein(a: string, b: string): number {
  // Handle edge cases
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const aLen = a.length;
  const bLen = b.length;

  // Create matrix
  const matrix: number[][] = Array.from({ length: aLen + 1 }, () =>
    new Array<number>(bLen + 1).fill(0)
  );

  // Initialize first column
  for (let i = 0; i <= aLen; i++) {
    matrix[i][0] = i;
  }

  // Initialize first row
  for (let j = 0; j <= bLen; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest
  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );

      // Transposition
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[aLen][bLen];
}

/**
 * Check if edit distance is within a threshold.
 * Uses early termination for efficiency.
 */
export function isWithinEditDistance(
  a: string,
  b: string,
  maxDistance: number,
  useDamerau = true
): boolean {
  // Quick length check
  if (Math.abs(a.length - b.length) > maxDistance) {
    return false;
  }

  const distance = useDamerau ? damerauLevenshtein(a, b) : levenshtein(a, b);
  return distance <= maxDistance;
}

/**
 * Find the optimal edit distance threshold based on word length.
 * Shorter words need stricter matching.
 */
export function getOptimalEditDistance(wordLength: number): number {
  if (wordLength <= 2) return 0;
  if (wordLength <= 4) return 1;
  if (wordLength <= 8) return 2;
  return 3;
}
