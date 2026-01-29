/**
 * Soundex algorithm for phonetic matching.
 * Groups words that sound similar together.
 *
 * Example: "phone" and "fone" both produce "F500"
 */
export function soundex(word: string): string {
  if (!word || word.length === 0) {
    return '';
  }

  const str = word.toUpperCase();

  // Soundex codes
  const codes: Record<string, string> = {
    A: '',
    E: '',
    I: '',
    O: '',
    U: '',
    H: '',
    W: '',
    Y: '',
    B: '1',
    F: '1',
    P: '1',
    V: '1',
    C: '2',
    G: '2',
    J: '2',
    K: '2',
    Q: '2',
    S: '2',
    X: '2',
    Z: '2',
    D: '3',
    T: '3',
    L: '4',
    M: '5',
    N: '5',
    R: '6',
  };

  // Keep the first letter
  let result = str[0];
  let prevCode = codes[str[0]] || '';

  for (let i = 1; i < str.length && result.length < 4; i++) {
    const char = str[i];
    const code = codes[char];

    if (code === undefined) {
      // Non-letter character
      continue;
    }

    if (code !== '' && code !== prevCode) {
      result += code;
    }

    prevCode = code;
  }

  // Pad with zeros to ensure 4 characters
  return result.padEnd(4, '0');
}

/**
 * Double Metaphone algorithm for better phonetic matching.
 * Returns two codes - primary and alternate pronunciation.
 *
 * More accurate than Soundex for many cases.
 */
export function metaphone(word: string): string {
  if (!word || word.length === 0) {
    return '';
  }

  const str = word.toUpperCase();
  let result = '';
  let i = 0;

  // Skip initial silent letters
  if (/^(KN|GN|PN|AE|WR)/.test(str)) {
    i = 1;
  }

  while (i < str.length && result.length < 6) {
    const char = str[i];
    const next = str[i + 1] || '';
    const next2 = str[i + 2] || '';

    // Already processed?
    if (char === result[result.length - 1] && char !== 'C') {
      i++;
      continue;
    }

    switch (char) {
      case 'A':
      case 'E':
      case 'I':
      case 'O':
      case 'U':
        // Only include vowels at the start
        if (i === 0) {
          result += char;
        }
        i++;
        break;

      case 'B':
        result += 'P';
        i += str[i + 1] === 'B' ? 2 : 1;
        break;

      case 'C':
        if (next === 'H') {
          result += 'X';
          i += 2;
        } else if (next === 'I' || next === 'E' || next === 'Y') {
          result += 'S';
          i++;
        } else {
          result += 'K';
          i++;
        }
        break;

      case 'D':
        if (next === 'G' && (next2 === 'E' || next2 === 'I' || next2 === 'Y')) {
          result += 'J';
          i += 2;
        } else {
          result += 'T';
          i++;
        }
        break;

      case 'F':
        result += 'F';
        i += next === 'F' ? 2 : 1;
        break;

      case 'G':
        if (next === 'H') {
          if (i > 0 && !'AEIOU'.includes(str[i - 1])) {
            i += 2;
          } else {
            result += 'K';
            i += 2;
          }
        } else if (next === 'N') {
          i += 2;
        } else if (next === 'I' || next === 'E' || next === 'Y') {
          result += 'J';
          i++;
        } else {
          result += 'K';
          i++;
        }
        break;

      case 'H':
        if (i === 0 || !'AEIOU'.includes(str[i - 1]) || 'AEIOU'.includes(next)) {
          result += 'H';
        }
        i++;
        break;

      case 'J':
        result += 'J';
        i++;
        break;

      case 'K':
        result += 'K';
        i += next === 'K' ? 2 : 1;
        break;

      case 'L':
        result += 'L';
        i += next === 'L' ? 2 : 1;
        break;

      case 'M':
        result += 'M';
        i += next === 'M' ? 2 : 1;
        break;

      case 'N':
        result += 'N';
        i += next === 'N' ? 2 : 1;
        break;

      case 'P':
        if (next === 'H') {
          result += 'F';
          i += 2;
        } else {
          result += 'P';
          i += next === 'P' ? 2 : 1;
        }
        break;

      case 'Q':
        result += 'K';
        i += next === 'Q' ? 2 : 1;
        break;

      case 'R':
        result += 'R';
        i += next === 'R' ? 2 : 1;
        break;

      case 'S':
        if (next === 'H') {
          result += 'X';
          i += 2;
        } else if (next === 'I' && (next2 === 'O' || next2 === 'A')) {
          result += 'X';
          i += 3;
        } else {
          result += 'S';
          i += next === 'S' ? 2 : 1;
        }
        break;

      case 'T':
        if (next === 'H') {
          result += '0'; // Using 0 for TH sound
          i += 2;
        } else if (next === 'I' && (next2 === 'O' || next2 === 'A')) {
          result += 'X';
          i += 3;
        } else {
          result += 'T';
          i += next === 'T' ? 2 : 1;
        }
        break;

      case 'V':
        result += 'F';
        i += next === 'V' ? 2 : 1;
        break;

      case 'W':
        if ('AEIOU'.includes(next)) {
          result += 'W';
        }
        i++;
        break;

      case 'X':
        result += 'KS';
        i++;
        break;

      case 'Y':
        if ('AEIOU'.includes(next)) {
          result += 'Y';
        }
        i++;
        break;

      case 'Z':
        result += 'S';
        i += next === 'Z' ? 2 : 1;
        break;

      default:
        i++;
    }
  }

  return result;
}

/**
 * Calculate phonetic similarity between two words
 * Returns a score between 0 and 1
 */
export function phoneticSimilarity(a: string, b: string): number {
  const soundexA = soundex(a);
  const soundexB = soundex(b);

  if (soundexA === soundexB) {
    return 1;
  }

  const metaphoneA = metaphone(a);
  const metaphoneB = metaphone(b);

  if (metaphoneA === metaphoneB) {
    return 0.9;
  }

  // Partial match scoring
  let score = 0;

  // Compare soundex codes
  for (let i = 0; i < 4; i++) {
    if (soundexA[i] === soundexB[i]) {
      score += 0.1;
    }
  }

  // Compare metaphone codes
  const minLen = Math.min(metaphoneA.length, metaphoneB.length);
  const maxLen = Math.max(metaphoneA.length, metaphoneB.length);

  if (maxLen > 0) {
    let matches = 0;
    for (let i = 0; i < minLen; i++) {
      if (metaphoneA[i] === metaphoneB[i]) {
        matches++;
      }
    }
    score += (matches / maxLen) * 0.5;
  }

  return Math.min(score, 1);
}
