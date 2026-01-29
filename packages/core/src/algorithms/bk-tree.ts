import { damerauLevenshtein } from './levenshtein';

/**
 * BK-Tree (Burkhard-Keller Tree) for efficient fuzzy string matching.
 *
 * A BK-tree is a tree data structure that allows for fast approximate string matching
 * using the triangle inequality property of edit distance metrics.
 *
 * Features:
 * - Efficient fuzzy search: O(n^α) where α < 1 for most queries
 * - Works with any metric that satisfies triangle inequality
 * - Ideal for spell checking suggestions
 */

interface BKNode {
  word: string;
  frequency: number;
  children: Map<number, BKNode>;
}

function createBKNode(word: string, frequency: number): BKNode {
  return {
    word,
    frequency,
    children: new Map(),
  };
}

export class BKTree {
  private root: BKNode | null = null;
  private nodeCount = 0;
  private distanceFunc: (a: string, b: string) => number;

  constructor(distanceFunc: (a: string, b: string) => number = damerauLevenshtein) {
    this.distanceFunc = distanceFunc;
  }

  /**
   * Insert a word into the BK-tree
   */
  insert(word: string, frequency = 1): void {
    if (!this.root) {
      this.root = createBKNode(word, frequency);
      this.nodeCount++;
      return;
    }

    let current = this.root;

    while (true) {
      const distance = this.distanceFunc(word, current.word);

      // Word already exists
      if (distance === 0) {
        current.frequency = Math.max(current.frequency, frequency);
        return;
      }

      const child = current.children.get(distance);

      if (!child) {
        current.children.set(distance, createBKNode(word, frequency));
        this.nodeCount++;
        return;
      }

      current = child;
    }
  }

  /**
   * Insert multiple words at once
   */
  insertAll(words: Iterable<string | [string, number]>): void {
    for (const item of words) {
      if (typeof item === 'string') {
        this.insert(item);
      } else {
        this.insert(item[0], item[1]);
      }
    }
  }

  /**
   * Find all words within a given edit distance
   */
  search(
    word: string,
    maxDistance: number
  ): Array<{ word: string; distance: number; frequency: number }> {
    const results: Array<{ word: string; distance: number; frequency: number }> = [];

    if (!this.root) {
      return results;
    }

    this.searchRecursive(this.root, word, maxDistance, results);

    // Sort by distance first, then by frequency (descending)
    results.sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }
      return b.frequency - a.frequency;
    });

    return results;
  }

  private searchRecursive(
    node: BKNode,
    word: string,
    maxDistance: number,
    results: Array<{ word: string; distance: number; frequency: number }>
  ): void {
    const distance = this.distanceFunc(word, node.word);

    if (distance <= maxDistance) {
      results.push({ word: node.word, distance, frequency: node.frequency });
    }

    // Use triangle inequality to prune search space
    // Only search children where the edge distance is within [distance - maxDistance, distance + maxDistance]
    const minRange = distance - maxDistance;
    const maxRange = distance + maxDistance;

    for (const [edgeDistance, child] of node.children) {
      if (edgeDistance >= minRange && edgeDistance <= maxRange) {
        this.searchRecursive(child, word, maxDistance, results);
      }
    }
  }

  /**
   * Check if an exact word exists in the tree
   */
  has(word: string): boolean {
    if (!this.root) {
      return false;
    }

    let current: BKNode | undefined = this.root;

    while (current) {
      const distance = this.distanceFunc(word, current.word);

      if (distance === 0) {
        return true;
      }

      current = current.children.get(distance);
    }

    return false;
  }

  /**
   * Get the frequency of a word (0 if not found)
   */
  getFrequency(word: string): number {
    if (!this.root) {
      return 0;
    }

    let current: BKNode | undefined = this.root;

    while (current) {
      const distance = this.distanceFunc(word, current.word);

      if (distance === 0) {
        return current.frequency;
      }

      current = current.children.get(distance);
    }

    return 0;
  }

  /**
   * Get the number of words in the tree
   */
  get size(): number {
    return this.nodeCount;
  }

  /**
   * Get all words in the tree
   */
  *getAllWords(): Generator<string> {
    if (!this.root) {
      return;
    }

    yield* this.getAllWordsRecursive(this.root);
  }

  private *getAllWordsRecursive(node: BKNode): Generator<string> {
    yield node.word;

    for (const child of node.children.values()) {
      yield* this.getAllWordsRecursive(child);
    }
  }
}
