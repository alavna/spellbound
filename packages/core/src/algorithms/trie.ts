/**
 * Trie (prefix tree) data structure for efficient dictionary lookups.
 *
 * Features:
 * - O(m) lookup where m is the word length
 * - O(m) insertion
 * - Prefix-based autocomplete
 * - Memory sharing for common prefixes
 */

interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  frequency: number;
}

function createNode(): TrieNode {
  return {
    children: new Map(),
    isEndOfWord: false,
    frequency: 0,
  };
}

export class Trie {
  private root: TrieNode = createNode();
  private wordCount = 0;

  /**
   * Insert a word into the trie
   */
  insert(word: string, frequency = 1): void {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, createNode());
      }
      node = node.children.get(char)!;
    }

    if (!node.isEndOfWord) {
      this.wordCount++;
    }
    node.isEndOfWord = true;
    node.frequency = frequency;
  }

  /**
   * Check if a word exists in the trie
   */
  has(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Get the frequency of a word (0 if not found)
   */
  getFrequency(word: string): number {
    const node = this.findNode(word);
    return node?.isEndOfWord ? node.frequency : 0;
  }

  /**
   * Remove a word from the trie
   */
  remove(word: string): boolean {
    return this.removeHelper(this.root, word, 0);
  }

  private removeHelper(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isEndOfWord) {
        return false;
      }
      node.isEndOfWord = false;
      this.wordCount--;
      return node.children.size === 0;
    }

    const char = word[depth];
    const childNode = node.children.get(char);

    if (!childNode) {
      return false;
    }

    const shouldDeleteChild = this.removeHelper(childNode, word, depth + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }

  /**
   * Find all words with a given prefix
   */
  findWordsWithPrefix(prefix: string, limit = 10): string[] {
    const node = this.findNode(prefix);
    if (!node) {
      return [];
    }

    const results: string[] = [];
    this.collectWords(node, prefix, results, limit);
    return results;
  }

  private collectWords(node: TrieNode, prefix: string, results: string[], limit: number): void {
    if (results.length >= limit) {
      return;
    }

    if (node.isEndOfWord) {
      results.push(prefix);
    }

    for (const [char, childNode] of node.children) {
      if (results.length >= limit) {
        break;
      }
      this.collectWords(childNode, prefix + char, results, limit);
    }
  }

  /**
   * Find the node for a given string (returns null if not found)
   */
  private findNode(str: string): TrieNode | null {
    let node = this.root;

    for (const char of str) {
      const child = node.children.get(char);
      if (!child) {
        return null;
      }
      node = child;
    }

    return node;
  }

  /**
   * Get all words in the trie
   */
  *getAllWords(): Generator<string> {
    yield* this.getAllWordsHelper(this.root, '');
  }

  private *getAllWordsHelper(node: TrieNode, prefix: string): Generator<string> {
    if (node.isEndOfWord) {
      yield prefix;
    }

    for (const [char, childNode] of node.children) {
      yield* this.getAllWordsHelper(childNode, prefix + char);
    }
  }

  /**
   * Get the number of words in the trie
   */
  get size(): number {
    return this.wordCount;
  }

  /**
   * Clear all words from the trie
   */
  clear(): void {
    this.root = createNode();
    this.wordCount = 0;
  }

  /**
   * Find words within a given edit distance using fuzzy search.
   * This is useful for spell checking suggestions.
   */
  findWithinEditDistance(
    word: string,
    maxDistance: number,
    limit = 10
  ): Array<{ word: string; distance: number; frequency: number }> {
    const results: Array<{ word: string; distance: number; frequency: number }> = [];
    const wordLen = word.length;

    // Initialize the first row of the Levenshtein matrix
    const currentRow: number[] = [];
    for (let i = 0; i <= wordLen; i++) {
      currentRow.push(i);
    }

    this.searchRecursive(this.root, '', word, currentRow, maxDistance, results, limit);

    // Sort by distance first, then by frequency (descending)
    results.sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }
      return b.frequency - a.frequency;
    });

    return results.slice(0, limit);
  }

  private searchRecursive(
    node: TrieNode,
    prefix: string,
    word: string,
    previousRow: number[],
    maxDistance: number,
    results: Array<{ word: string; distance: number; frequency: number }>,
    limit: number
  ): void {
    if (results.length >= limit * 2) {
      // Collect more than limit, we'll sort and trim later
      return;
    }

    const wordLen = word.length;

    // Check if this node represents a complete word within the distance
    if (node.isEndOfWord) {
      const distance = previousRow[wordLen];
      if (distance <= maxDistance) {
        results.push({ word: prefix, distance, frequency: node.frequency });
      }
    }

    // Continue searching children
    for (const [char, childNode] of node.children) {
      const currentRow: number[] = [previousRow[0] + 1];

      for (let i = 1; i <= wordLen; i++) {
        const insertCost = currentRow[i - 1] + 1;
        const deleteCost = previousRow[i] + 1;
        const replaceCost = previousRow[i - 1] + (word[i - 1] === char ? 0 : 1);
        currentRow.push(Math.min(insertCost, deleteCost, replaceCost));
      }

      // Only continue if there's a chance to find words within the distance
      const minInRow = Math.min(...currentRow);
      if (minInRow <= maxDistance) {
        this.searchRecursive(
          childNode,
          prefix + char,
          word,
          currentRow,
          maxDistance,
          results,
          limit
        );
      }
    }
  }
}
