# Spellbound - Complete Documentation

> A privacy-first, offline-capable spell checker and grammar checker library for web applications.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Packages](#packages)
5. [Core Package API](#core-package-api)
6. [React Package API](#react-package-api)
7. [Dictionary Package](#dictionary-package)
8. [TypeScript Types Reference](#typescript-types-reference)
9. [Built-in Grammar Rules](#built-in-grammar-rules)
10. [Advanced Usage](#advanced-usage)
11. [Examples](#examples)

---

## Overview

**Spellbound** is a comprehensive spell checking and grammar checking library designed for web applications. It runs entirely in the browser, ensuring user privacy since no text is ever sent to a server.

### Key Features

- **100% Client-Side**: All processing happens in the browser
- **Privacy-First**: User text never leaves their device
- **Offline-Capable**: Works without internet after initial dictionary download
- **14,663 Grammar Rules**: Imported from LanguageTool (LGPL licensed)
- **276,830 Word Dictionary**: Comprehensive English dictionary with frequency data
- **Framework-Agnostic Core**: Use with any JavaScript framework
- **React Bindings**: Ready-to-use hooks and components for React
- **Extensible**: Add custom dictionaries, rules, and storage

### Package Sizes

| Package                  | Raw Size | Gzipped |
| ------------------------ | -------- | ------- |
| `@spellbound/core`       | 6.92 MB  | ~1.5 MB |
| `@spellbound/react`      | 17.90 KB | ~5 KB   |
| `@spellbound/dict-en-us` | 11.28 MB | 1.04 MB |

---

## Installation

```bash
# Using npm
npm install @spellbound/core @spellbound/dict-en-us

# Using pnpm
pnpm add @spellbound/core @spellbound/dict-en-us

# Using yarn
yarn add @spellbound/core @spellbound/dict-en-us

# For React applications, also install:
npm install @spellbound/react
```

---

## Quick Start

### Vanilla JavaScript

```typescript
import {
  createSpellChecker,
  createGrammarChecker,
  createDictionaryManager,
  builtInRules,
} from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

// 1. Initialize the dictionary manager
const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

// 2. Create spell checker
const spellChecker = createSpellChecker({
  dictionaryManager: dictManager,
  maxSuggestions: 5,
  maxEditDistance: 2,
});

// 3. Create grammar checker
const grammarChecker = createGrammarChecker({
  rules: builtInRules,
});

// 4. Check text
const text = 'Ths is a tset of teh spell chekcer.';

// Spell check
const spellResults = spellChecker.check(text);
console.log('Spelling errors:', spellResults);
// Output: [{ word: 'Ths', start: 0, end: 3, suggestions: [...] }, ...]

// Grammar check
const grammarResults = grammarChecker.check(text);
console.log('Grammar issues:', grammarResults.issues);
```

### React

```tsx
import React, { useState } from 'react';
import {
  SpellboundProvider,
  useSpellcheck,
  useGrammarCheck,
  HighlightedText,
} from '@spellbound/react';
import { createDictionaryManager, builtInRules } from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

// Setup dictionary manager
const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

function App() {
  return (
    <SpellboundProvider
      config={{
        dictionaryManager: dictManager,
        grammarCheckerOptions: { rules: builtInRules },
        debounceMs: 300,
      }}
    >
      <Editor />
    </SpellboundProvider>
  );
}

function Editor() {
  const [text, setText] = useState('');
  const { errors, getSuggestions, addToDictionary, ignoreWord } = useSpellcheck(text);
  const { issues } = useGrammarCheck(text);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />

      <HighlightedText
        text={text}
        spellingErrors={errors}
        grammarIssues={issues}
        onHighlightClick={(position, event) => {
          console.log('Clicked:', position);
        }}
      />

      {errors.length > 0 && (
        <div>
          <h3>Spelling Errors:</h3>
          {errors.map((error) => (
            <div key={`${error.start}-${error.end}`}>
              <strong>{error.word}</strong>
              <span>Suggestions: {getSuggestions(error.word).join(', ')}</span>
              <button onClick={() => addToDictionary(error.word)}>Add to Dictionary</button>
              <button onClick={() => ignoreWord(error.word)}>Ignore</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Packages

### @spellbound/core

The core package contains all the spell checking and grammar checking logic. It is framework-agnostic and can be used in any JavaScript environment.

**Main Exports:**

```typescript
// Spell Checking
export { SpellChecker, createSpellChecker } from './spellcheck';

// Grammar Checking
export { GrammarChecker, createGrammarChecker, RuleRegistry, createRuleRegistry } from './grammar';

// Dictionary Management
export {
  DictionaryManager,
  createDictionaryManager,
  Tokenizer,
  createTokenizer,
} from './dictionary';

// Dictionary Utilities
export {
  loadDictionaryFromUrl,
  loadDictionaryFromJson,
  loadDictionaryFromWordList,
  loadDictionaryFromCsv,
  createEmptyDictionary,
  compressDictionary,
  mergeDictionaries,
} from './dictionary';

// Algorithms (for advanced use)
export {
  levenshtein,
  damerauLevenshtein,
  isWithinEditDistance,
  getOptimalEditDistance,
  Trie,
  BKTree,
  soundex,
  metaphone,
  phoneticSimilarity,
} from './algorithms';

// Built-in Rules
export { builtInRules } from './rules';
export {
  capitalizationRules,
  punctuationRules,
  commonMistakesRules,
  repetitionRules,
  articleRules,
  agreementRules,
  typographyRules,
} from './rules';

// Imported LanguageTool Rules (14,663 rules)
export {
  importedRules, // All imported rules combined
  ltGrammarRules, // 1,562 grammar rules
  ltStyleRules, // 210 style rules
  confusionRules, // 4,352 commonly confused word pairs
  compoundRules, // 8,539 compound word rules
} from './rules';
```

### @spellbound/react

React bindings for Spellbound, providing hooks and components for easy integration.

**Main Exports:**

```typescript
// Context & Provider
export {
  SpellboundProvider,
  SpellboundContext,
  useSpellboundContext,
  useSpellboundContextSafe,
} from './context';

// Hooks
export { useSpellcheck, useGrammarCheck, useProofreading } from './hooks';

// Components
export { HighlightedText, SuggestionPopover } from './components';
```

### @spellbound/dict-en-us

Pre-built English (US) dictionary with 276,830 words and frequency data.

```typescript
import dictionary from '@spellbound/dict-en-us';

// Dictionary structure:
// {
//   version: 1,
//   language: 'en-us',
//   name: 'SCOWL English Dictionary',
//   words: [['the', 100000000], ['be', 50000000], ...],
//   hasFrequency: true
// }
```

---

## Core Package API

### SpellChecker

The main class for spell checking text.

#### Creating a SpellChecker

```typescript
import { createSpellChecker, createDictionaryManager } from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

const spellChecker = createSpellChecker({
  dictionaryManager: dictManager,
  maxSuggestions: 5, // Max suggestions per word (default: 5)
  maxEditDistance: 2, // Max edit distance for suggestions (default: 2)
  ignoreCase: true, // Ignore case when checking (default: true)
  ignoreAllCaps: true, // Ignore ALL CAPS words (default: true)
  ignoreWordsWithNumbers: true, // Ignore words like "test123" (default: true)
  contentType: 'plain', // 'plain' | 'markdown' | 'html'
});
```

#### SpellChecker Methods

```typescript
// Check text for spelling errors
const results: SpellCheckResult[] = spellChecker.check(text);

// Get suggestions for a single word
const suggestions: string[] = spellChecker.getSuggestions('mispelled');

// Check if a word is spelled correctly
const isCorrect: boolean = spellChecker.isCorrect('hello');

// Add word to user dictionary
spellChecker.addToUserDictionary('customword');

// Remove word from user dictionary
spellChecker.removeFromUserDictionary('customword');

// Ignore a word for the current session
spellChecker.ignoreWord('tempignore');
```

#### SpellCheckResult Interface

```typescript
interface SpellCheckResult {
  word: string; // The misspelled word
  start: number; // Start position in text (0-indexed)
  end: number; // End position (exclusive)
  isCorrect: boolean; // Always false for results
  suggestions: Suggestion[];
}

interface Suggestion {
  word: string; // Suggested correction
  distance: number; // Edit distance from original
  score: number; // Confidence score (0-1)
}
```

---

### GrammarChecker

The main class for grammar checking text.

#### Creating a GrammarChecker

```typescript
import { createGrammarChecker, builtInRules, importedRules } from '@spellbound/core';

// With built-in rules only (7 core rules)
const grammarChecker = createGrammarChecker({
  rules: builtInRules,
});

// With all imported rules (1,800+ rules) - larger bundle
const grammarCheckerFull = createGrammarChecker({
  rules: [...builtInRules, ...importedRules],
});

// With selective rules
import { confusionRules, compoundRules } from '@spellbound/core';

const grammarCheckerCustom = createGrammarChecker({
  rules: [...builtInRules, ...confusionRules], // Only confusion rules
  disableRules: ['double-spaces'], // Disable specific rules
});
```

#### GrammarChecker Methods

```typescript
// Check text for grammar issues
const result: GrammarCheckResult = grammarChecker.check(text);
console.log(result.issues);

// Enable a rule
grammarChecker.enableRule('rule-id');

// Disable a rule
grammarChecker.disableRule('rule-id');

// Get all registered rules
const rules: GrammarRule[] = grammarChecker.getRules();

// Add a custom rule
grammarChecker.addRule(customRule);
```

#### GrammarCheckResult & GrammarIssue Interfaces

```typescript
interface GrammarCheckResult {
  text: string; // Original text
  issues: GrammarIssue[];
}

interface GrammarIssue {
  ruleId: string; // Rule that triggered this issue
  message: string; // Human-readable description
  severity: IssueSeverity; // 'error' | 'warning' | 'info'
  start: number; // Start position
  end: number; // End position (exclusive)
  match: string; // The problematic text
  replacements: string[]; // Suggested fixes
  category: IssueCategory;
}

type IssueSeverity = 'error' | 'warning' | 'info';

type IssueCategory =
  | 'spelling'
  | 'grammar'
  | 'punctuation'
  | 'capitalization'
  | 'style'
  | 'typography'
  | 'repetition'
  | 'confusion'
  | 'compounds'
  | 'custom';
```

---

### DictionaryManager

Manages dictionaries and word lookups.

#### Creating a DictionaryManager

```typescript
import { createDictionaryManager } from '@spellbound/core';

const dictManager = createDictionaryManager({
  persist: true, // Persist user words to localStorage
  storageKey: 'my-app-user-dictionary', // Custom storage key
  ignoreCase: true, // Case-insensitive lookups
});
```

#### DictionaryManager Methods

```typescript
// Load a dictionary
dictManager.loadDictionary(dictionary);

// Check if a word exists
const exists: boolean = dictManager.has('hello');

// Get word frequency (0 if not found)
const frequency: number = dictManager.getFrequency('the');

// Add a word to user dictionary
dictManager.addWord('customword');

// Remove a word from user dictionary
dictManager.removeWord('customword');

// Get dictionary statistics
const stats: DictionaryStats = dictManager.getStats();
// { totalWords: 276830, customWords: 5, loadedDictionaries: ['en-us'], memoryEstimate: 15000000 }

// Get suggestions for a misspelled word (uses BK-Tree)
const suggestions: string[] = dictManager.getSuggestions('mispelled', 5, 2);
```

---

### Algorithms

Low-level algorithms available for advanced use.

#### Edit Distance

```typescript
import { levenshtein, damerauLevenshtein, isWithinEditDistance } from '@spellbound/core';

// Basic Levenshtein distance
const distance = levenshtein('kitten', 'sitting'); // 3

// Damerau-Levenshtein (includes transpositions)
const distance2 = damerauLevenshtein('ab', 'ba'); // 1 (transposition)

// Quick check if within threshold
const isClose = isWithinEditDistance('hello', 'helo', 1); // true
```

#### Phonetic Algorithms

```typescript
import { soundex, metaphone, phoneticSimilarity } from '@spellbound/core';

// Soundex encoding
const code = soundex('Robert'); // 'R163'

// Metaphone encoding
const meta = metaphone('knight'); // 'NT'

// Check phonetic similarity
const similar = phoneticSimilarity('knight', 'night'); // true
```

#### Data Structures

```typescript
import { Trie, BKTree } from '@spellbound/core';

// Trie for fast prefix lookups
const trie = new Trie();
trie.insert('hello');
trie.insert('help');
trie.insert('helper');

trie.has('hello'); // true
trie.startsWith('hel'); // true
trie.getWordsWithPrefix('hel'); // ['hello', 'help', 'helper']

// BK-Tree for fuzzy matching
const bkTree = new BKTree();
bkTree.insert('hello');
bkTree.insert('world');

const matches = bkTree.search('helo', 1); // ['hello']
```

---

## React Package API

### SpellboundProvider

Context provider that initializes Spellbound and makes it available to child components.

```tsx
import { SpellboundProvider } from '@spellbound/react';
import { createDictionaryManager, builtInRules } from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

function App() {
  return (
    <SpellboundProvider
      config={{
        // Dictionary manager (required for spell checking)
        dictionaryManager: dictManager,

        // Spell checker options
        spellCheckerOptions: {
          maxSuggestions: 5,
          maxEditDistance: 2,
          ignoreAllCaps: true,
        },

        // Grammar checker options
        grammarCheckerOptions: {
          rules: builtInRules,
        },

        // Debounce delay in ms (default: 300)
        debounceMs: 300,

        // Enable/disable features (default: true)
        enableSpellCheck: true,
        enableGrammarCheck: true,

        // Persist user dictionary (default: false)
        persistUserDictionary: true,
        userDictionaryKey: 'my-app-user-dict',
      }}
    >
      {children}
    </SpellboundProvider>
  );
}
```

### SpellboundConfig Interface

```typescript
interface SpellboundConfig {
  spellCheckerOptions?: SpellCheckerOptions;
  grammarCheckerOptions?: GrammarCheckerOptions;
  dictionaryManager?: DictionaryManager;
  spellChecker?: SpellChecker;
  grammarChecker?: GrammarChecker;
  debounceMs?: number; // Default: 300
  enableSpellCheck?: boolean; // Default: true
  enableGrammarCheck?: boolean; // Default: true
  persistUserDictionary?: boolean; // Default: false
  userDictionaryKey?: string; // Default: 'spellbound-user-dictionary'
}
```

---

### useSpellcheck Hook

Hook for spell checking text with automatic debouncing.

```tsx
import { useSpellcheck } from '@spellbound/react';

function Editor() {
  const [text, setText] = useState('');

  const {
    errors, // SpellCheckResult[] - current spelling errors
    isChecking, // boolean - whether check is in progress
    getSuggestions, // (word: string, limit?: number) => string[]
    addToDictionary, // (word: string) => void
    ignoreWord, // (word: string) => void
    recheck, // () => void - manually trigger recheck
  } = useSpellcheck(text, {
    enabled: true, // Enable/disable checking (default: true)
    debounceMs: 300, // Override provider's debounce (optional)
  });

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />

      {isChecking && <span>Checking...</span>}

      {errors.map((error) => (
        <div key={`${error.start}-${error.end}`}>
          <span style={{ color: 'red' }}>{error.word}</span>
          <ul>
            {getSuggestions(error.word).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <button onClick={() => addToDictionary(error.word)}>Add</button>
          <button onClick={() => ignoreWord(error.word)}>Ignore</button>
        </div>
      ))}
    </div>
  );
}
```

### UseSpellcheckResult Interface

```typescript
interface UseSpellcheckResult {
  errors: SpellCheckResult[];
  isChecking: boolean;
  getSuggestions: (word: string, limit?: number) => string[];
  addToDictionary: (word: string) => void;
  ignoreWord: (word: string) => void;
  recheck: () => void;
}
```

---

### useGrammarCheck Hook

Hook for grammar checking text with automatic debouncing.

```tsx
import { useGrammarCheck } from '@spellbound/react';

function Editor() {
  const [text, setText] = useState('');

  const {
    issues, // GrammarIssue[] - current grammar issues
    isChecking, // boolean - whether check is in progress
    recheck, // () => void - manually trigger recheck
  } = useGrammarCheck(text, {
    enabled: true,
    debounceMs: 300,
  });

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />

      {issues.map((issue) => (
        <div key={`${issue.start}-${issue.end}`}>
          <span style={{ color: issue.severity === 'error' ? 'red' : 'orange' }}>
            {issue.match}
          </span>
          <p>{issue.message}</p>
          <p>Suggestions: {issue.replacements.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
```

### UseGrammarCheckResult Interface

```typescript
interface UseGrammarCheckResult {
  issues: GrammarIssue[];
  isChecking: boolean;
  recheck: () => void;
}
```

---

### useProofreading Hook

Combined hook for both spell checking and grammar checking.

```tsx
import { useProofreading } from '@spellbound/react';

function Editor() {
  const [text, setText] = useState('');

  const {
    spellingErrors,
    grammarIssues,
    isChecking,
    getSuggestions,
    addToDictionary,
    ignoreWord,
    recheck,
  } = useProofreading(text);

  // Use combined results...
}
```

---

### HighlightedText Component

Renders text with underlined spelling errors and grammar issues.

```tsx
import { HighlightedText } from '@spellbound/react';

function Editor() {
  const [text, setText] = useState('');
  const { errors } = useSpellcheck(text);
  const { issues } = useGrammarCheck(text);

  return (
    <HighlightedText
      text={text}
      spellingErrors={errors}
      grammarIssues={issues}
      // Custom CSS classes for highlights
      spellingClassName="spelling-error"
      grammarClassName="grammar-issue"
      // Click handler for highlighted text
      onHighlightClick={(position, event) => {
        console.log('Clicked:', position.data);
        // Show suggestion popover, etc.
      }}
      // Custom renderer for highlights
      renderHighlight={(text, position, defaultElement) => (
        <span
          style={{
            textDecoration: 'underline wavy',
            textDecorationColor: position.type === 'spelling' ? 'red' : 'orange',
          }}
        >
          {text}
        </span>
      )}
      className="highlighted-text-container"
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
}
```

### HighlightedTextProps Interface

```typescript
interface HighlightedTextProps {
  text: string;
  spellingErrors?: SpellCheckResult[];
  grammarIssues?: GrammarIssue[];
  spellingClassName?: string;
  grammarClassName?: string;
  onHighlightClick?: (position: HighlightPosition, event: React.MouseEvent) => void;
  renderHighlight?: (
    text: string,
    position: HighlightPosition,
    defaultElement: React.ReactNode
  ) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface HighlightPosition {
  start: number;
  end: number;
  type: 'spelling' | 'grammar';
  data: SpellCheckResult | GrammarIssue;
}
```

---

### SuggestionPopover Component

A popover component for showing correction suggestions.

```tsx
import { SuggestionPopover } from '@spellbound/react';

function Editor() {
  const [popoverState, setPopoverState] = useState({
    isOpen: false,
    position: null,
    word: '',
    suggestions: [],
    type: 'spelling',
  });

  const handleHighlightClick = (position, event) => {
    const rect = event.target.getBoundingClientRect();
    setPopoverState({
      isOpen: true,
      position: { x: rect.left, y: rect.bottom },
      word: position.type === 'spelling' ? position.data.word : position.data.match,
      suggestions:
        position.type === 'spelling'
          ? getSuggestions(position.data.word).map((s) => ({ text: s, type: 'spelling' }))
          : position.data.replacements.map((r) => ({ text: r, type: 'grammar' })),
      type: position.type,
    });
  };

  return (
    <>
      <HighlightedText
        text={text}
        spellingErrors={errors}
        grammarIssues={issues}
        onHighlightClick={handleHighlightClick}
      />

      <SuggestionPopover
        isOpen={popoverState.isOpen}
        anchorPosition={popoverState.position}
        word={popoverState.word}
        suggestions={popoverState.suggestions}
        type={popoverState.type}
        onSelect={(suggestion) => {
          // Apply the suggestion
          const newText =
            text.slice(0, currentError.start) + suggestion.text + text.slice(currentError.end);
          setText(newText);
          setPopoverState((prev) => ({ ...prev, isOpen: false }));
        }}
        onAddToDictionary={() => {
          addToDictionary(popoverState.word);
          setPopoverState((prev) => ({ ...prev, isOpen: false }));
        }}
        onIgnore={() => {
          ignoreWord(popoverState.word);
          setPopoverState((prev) => ({ ...prev, isOpen: false }));
        }}
        onClose={() => setPopoverState((prev) => ({ ...prev, isOpen: false }))}
        maxSuggestions={5}
        className="my-popover"
      />
    </>
  );
}
```

### SuggestionPopoverProps Interface

```typescript
interface SuggestionPopoverProps {
  isOpen: boolean;
  anchorPosition: { x: number; y: number } | null;
  word: string;
  suggestions: SuggestionItem[];
  onSelect: (suggestion: SuggestionItem) => void;
  onAddToDictionary?: () => void;
  onIgnore?: () => void;
  onClose: () => void;
  type: 'spelling' | 'grammar';
  className?: string;
  maxSuggestions?: number; // Default: 5
}

interface SuggestionItem {
  text: string;
  description?: string;
  type: 'spelling' | 'grammar';
}
```

---

## Dictionary Package

The `@spellbound/dict-en-us` package provides a pre-built English dictionary.

### Dictionary Structure

```typescript
interface CompressedDictionary {
  version: 1;
  language: string; // 'en-us'
  name: string; // 'SCOWL English Dictionary'
  words: [string, number][]; // [word, frequency] tuples
  hasFrequency: boolean; // true
  metadata?: {
    source?: string;
    wordCount?: number; // 276,830
    createdAt?: string;
  };
}
```

### Loading the Dictionary

```typescript
import dictionary from '@spellbound/dict-en-us';
import { createDictionaryManager } from '@spellbound/core';

const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

console.log(dictManager.getStats());
// { totalWords: 276830, customWords: 0, loadedDictionaries: ['SCOWL English Dictionary'], ... }
```

### Creating Custom Dictionaries

```typescript
import {
  createDictionaryManager,
  loadDictionaryFromWordList,
  loadDictionaryFromCsv,
} from '@spellbound/core';

const dictManager = createDictionaryManager();

// From a simple word list (array of strings)
const customWords = ['mycompany', 'brandname', 'productx'];
const customDict = loadDictionaryFromWordList(customWords, {
  language: 'custom',
  name: 'My Custom Dictionary',
});
dictManager.loadDictionary(customDict);

// From CSV with frequency data
const csvDict = await loadDictionaryFromCsv('/path/to/words.csv', {
  language: 'en-us',
  name: 'CSV Dictionary',
});
dictManager.loadDictionary(csvDict);
```

---

## TypeScript Types Reference

### Spell Check Types

```typescript
// Result of checking a single word
interface SpellCheckResult {
  word: string;
  start: number;
  end: number;
  isCorrect: boolean;
  suggestions: Suggestion[];
}

// A suggested correction
interface Suggestion {
  word: string;
  distance: number;
  score: number;
}

// Spell checker options
interface SpellCheckerOptions {
  maxSuggestions?: number;
  maxEditDistance?: number;
  ignoreCase?: boolean;
  ignoreAllCaps?: boolean;
  ignoreWordsWithNumbers?: boolean;
  customWords?: string[];
  persist?: boolean;
  storageKey?: string;
  contentType?: ContentType;
  dictionaryManager?: DictionaryManager;
}

type ContentType = 'plain' | 'markdown' | 'html';

// Token from tokenizer
interface Token {
  value: string;
  start: number;
  end: number;
  type: TokenType;
}

type TokenType =
  | 'word'
  | 'punctuation'
  | 'whitespace'
  | 'number'
  | 'url'
  | 'email'
  | 'code'
  | 'hashtag'
  | 'mention';
```

### Grammar Types

```typescript
// Result of grammar checking
interface GrammarCheckResult {
  text: string;
  issues: GrammarIssue[];
}

// A grammar issue
interface GrammarIssue {
  ruleId: string;
  message: string;
  severity: IssueSeverity;
  start: number;
  end: number;
  match: string;
  replacements: string[];
  category: IssueCategory;
}

type IssueSeverity = 'error' | 'warning' | 'info';

type IssueCategory =
  | 'spelling'
  | 'grammar'
  | 'punctuation'
  | 'capitalization'
  | 'style'
  | 'typography'
  | 'repetition'
  | 'confusion'
  | 'compounds'
  | 'custom';

// Grammar rule interface
interface GrammarRule {
  id: string;
  name: string;
  description: string;
  severity: IssueSeverity;
  category: IssueCategory;
  enabled: boolean;
  check(context: RuleContext): GrammarIssue[];
}

// Context passed to rules
interface RuleContext {
  text: string;
  tokens: Token[];
  sentences: Sentence[];
  createIssue(params: CreateIssueParams): GrammarIssue;
}

interface CreateIssueParams {
  start: number;
  end: number;
  match: string;
  message: string;
  replacements?: string[];
}

interface Sentence {
  text: string;
  start: number;
  end: number;
  tokens: Token[];
}

// Grammar checker options
interface GrammarCheckerOptions {
  rules?: GrammarRule[];
  enableRules?: string[];
  disableRules?: string[];
  persist?: boolean;
  storageKey?: string;
  contentType?: ContentType;
}

// Pattern-based rule (JSON format)
interface PatternRule {
  id: string;
  name: string;
  description: string;
  severity: IssueSeverity;
  category: IssueCategory;
  enabled: boolean;
  pattern: string; // Regex pattern as string
  flags?: string; // e.g., 'gi'
  message: string;
  replacements?: string[];
}
```

### Dictionary Types

```typescript
// Dictionary interface
interface Dictionary {
  language: string;
  name: string;
  has(word: string): boolean;
  getFrequency(word: string): number;
  getWords(): Iterable<string>;
  size: number;
}

// Compressed dictionary format
interface CompressedDictionary {
  version: 1;
  language: string;
  name: string;
  words: string[] | [string, number][];
  hasFrequency: boolean;
  metadata?: {
    source?: string;
    wordCount?: number;
    createdAt?: string;
  };
}

// Dictionary manager options
interface DictionaryManagerOptions {
  dictionaries?: CompressedDictionary[];
  customWords?: string[];
  persist?: boolean;
  storageKey?: string;
  ignoreCase?: boolean;
}

// Dictionary statistics
interface DictionaryStats {
  totalWords: number;
  customWords: number;
  loadedDictionaries: string[];
  memoryEstimate: number;
}

// Load options
interface DictionaryLoadOptions {
  merge?: boolean;
  defaultFrequency?: number;
}
```

### Persistence Types

```typescript
interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface PersistenceOptions {
  storage?: Storage;
  key?: string;
}

interface PersistedUserDictionary {
  words: string[];
  ignoredWords: string[];
  timestamp: number;
}

interface PersistedRuleSettings {
  enabledRules: string[];
  disabledRules: string[];
  timestamp: number;
}
```

---

## Built-in Grammar Rules

The library includes **1,800+ grammar rules** total:

| Category               | Count | Description                                      |
| ---------------------- | ----- | ------------------------------------------------ |
| **Grammar**            | 1,562 | Verb forms, tenses, word order, common mistakes  |
| **Style**              | 210   | Writing clarity, wordiness, formality            |
| **Compounds**          | 27    | Hyphenation and compound word rules              |
| **Confusion Sets**     | 26    | Commonly confused words (their/they're, etc.)    |
| **Built-in Core**      | 7     | Capitalization, punctuation, articles, agreement |

### Using Specific Rule Categories

```typescript
import {
  capitalizationRules,
  punctuationRules,
  commonMistakesRules,
  repetitionRules,
  articleRules,
  agreementRules,
  typographyRules,
} from '@spellbound/core';

// Use only specific categories
const grammarChecker = createGrammarChecker({
  rules: [...capitalizationRules, ...punctuationRules, ...commonMistakesRules],
});
```

### Imported LanguageTool Rules

```typescript
import {
  importedRules, // All 14,663 rules
  ltGrammarRules, // 1,562 grammar rules
  ltStyleRules, // 210 style rules
  confusionRules, // 4,352 confusion pairs (affect/effect, etc.)
  compoundRules, // 8,539 compound words (back fire → backfire)
} from '@spellbound/core';

// Full grammar checking with all rules (large bundle)
const fullChecker = createGrammarChecker({
  rules: [...builtInRules, ...importedRules],
});

// Just commonly confused words
const confusionChecker = createGrammarChecker({
  rules: [...builtInRules, ...confusionRules],
});
```

---

## Advanced Usage

### Creating Custom Grammar Rules

```typescript
import type { GrammarRule, RuleContext, GrammarIssue } from '@spellbound/core';

const myCustomRule: GrammarRule = {
  id: 'my-company-style',
  name: 'Company Style Guide',
  description: 'Enforces company-specific style guidelines',
  severity: 'warning',
  category: 'style',
  enabled: true,

  check(context: RuleContext): GrammarIssue[] {
    const issues: GrammarIssue[] = [];

    // Example: Flag "utilize" and suggest "use"
    const pattern = /\butilize\b/gi;
    let match;

    while ((match = pattern.exec(context.text)) !== null) {
      issues.push(
        context.createIssue({
          start: match.index,
          end: match.index + match[0].length,
          match: match[0],
          message: 'Prefer "use" over "utilize" for clarity.',
          replacements: ['use'],
        })
      );
    }

    return issues;
  },
};

// Use the custom rule
const grammarChecker = createGrammarChecker({
  rules: [...builtInRules, myCustomRule],
});
```

### Lazy Loading Rules for Performance

```typescript
// Only load heavy rules when needed
const grammarChecker = createGrammarChecker({
  rules: builtInRules, // Start with lightweight rules
});

// Later, when user enables "advanced checking"
async function enableAdvancedChecking() {
  const { importedRules } = await import('@spellbound/core');

  importedRules.forEach((rule) => {
    grammarChecker.addRule(rule);
  });
}
```

### Custom Storage Adapter

```typescript
import { createDictionaryManager } from '@spellbound/core';

// Use IndexedDB instead of localStorage
const indexedDBStorage = {
  async getItem(key: string): Promise<string | null> {
    const db = await openDB('spellbound', 1);
    return db.get('storage', key);
  },
  async setItem(key: string, value: string): Promise<void> {
    const db = await openDB('spellbound', 1);
    await db.put('storage', value, key);
  },
  async removeItem(key: string): Promise<void> {
    const db = await openDB('spellbound', 1);
    await db.delete('storage', key);
  },
};

// Note: Currently the library uses sync storage APIs
// You may need to pre-load data for async storage
```

### Web Worker Integration

For large texts, consider running checks in a Web Worker:

```typescript
// worker.ts
import {
  createSpellChecker,
  createGrammarChecker,
  createDictionaryManager,
  builtInRules,
} from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

const spellChecker = createSpellChecker({ dictionaryManager: dictManager });
const grammarChecker = createGrammarChecker({ rules: builtInRules });

self.onmessage = (e) => {
  const { type, text } = e.data;

  if (type === 'spell') {
    const results = spellChecker.check(text);
    self.postMessage({ type: 'spell', results });
  } else if (type === 'grammar') {
    const results = grammarChecker.check(text);
    self.postMessage({ type: 'grammar', results });
  }
};

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url));

function checkTextInWorker(text: string) {
  return new Promise((resolve) => {
    worker.onmessage = (e) => resolve(e.data);
    worker.postMessage({ type: 'spell', text });
  });
}
```

---

## Examples

### Complete React Editor Example

```tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  SpellboundProvider,
  useSpellcheck,
  useGrammarCheck,
  HighlightedText,
  SuggestionPopover,
} from '@spellbound/react';
import { createDictionaryManager, builtInRules, confusionRules } from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

// Initialize dictionary once
const dictManager = createDictionaryManager({ persist: true });
dictManager.loadDictionary(dictionary);

function ProofreadingEditor() {
  const [text, setText] = useState('');
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);
  const [popover, setPopover] = useState<{
    isOpen: boolean;
    position: { x: number; y: number } | null;
    word: string;
    suggestions: Array<{ text: string; type: 'spelling' | 'grammar' }>;
    type: 'spelling' | 'grammar';
    errorStart: number;
    errorEnd: number;
  }>({
    isOpen: false,
    position: null,
    word: '',
    suggestions: [],
    type: 'spelling',
    errorStart: 0,
    errorEnd: 0,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    errors,
    isChecking: isSpellChecking,
    getSuggestions,
    addToDictionary,
    ignoreWord,
  } = useSpellcheck(text);
  const { issues, isChecking: isGrammarChecking } = useGrammarCheck(text);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleHighlightClick = useCallback(
    (position: any, event: React.MouseEvent) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();

      if (position.type === 'spelling') {
        const error = position.data;
        setPopover({
          isOpen: true,
          position: { x: rect.left, y: rect.bottom + 5 },
          word: error.word,
          suggestions: getSuggestions(error.word, 5).map((s) => ({
            text: s,
            type: 'spelling' as const,
          })),
          type: 'spelling',
          errorStart: error.start,
          errorEnd: error.end,
        });
      } else {
        const issue = position.data;
        setPopover({
          isOpen: true,
          position: { x: rect.left, y: rect.bottom + 5 },
          word: issue.match,
          suggestions: issue.replacements
            .slice(0, 5)
            .map((r: string) => ({ text: r, type: 'grammar' as const })),
          type: 'grammar',
          errorStart: issue.start,
          errorEnd: issue.end,
        });
      }
    },
    [getSuggestions]
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: { text: string }) => {
      const newText =
        text.slice(0, popover.errorStart) + suggestion.text + text.slice(popover.errorEnd);
      setText(newText);
      setPopover((prev) => ({ ...prev, isOpen: false }));
    },
    [text, popover.errorStart, popover.errorEnd]
  );

  const handleAddToDictionary = useCallback(() => {
    addToDictionary(popover.word);
    setPopover((prev) => ({ ...prev, isOpen: false }));
  }, [addToDictionary, popover.word]);

  const handleIgnore = useCallback(() => {
    ignoreWord(popover.word);
    setPopover((prev) => ({ ...prev, isOpen: false }));
  }, [ignoreWord, popover.word]);

  const handleClosePopover = useCallback(() => {
    setPopover((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Proofreading Editor</h1>

      <div style={{ marginBottom: '10px' }}>
        {(isSpellChecking || isGrammarChecking) && (
          <span style={{ color: '#666' }}>Checking...</span>
        )}
        {!isSpellChecking && !isGrammarChecking && (
          <span>
            {errors.length} spelling errors, {issues.length} grammar issues
          </span>
        )}
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing to check spelling and grammar..."
        style={{
          width: '100%',
          minHeight: '200px',
          padding: '10px',
          fontSize: '16px',
          fontFamily: 'inherit',
          marginBottom: '20px',
        }}
      />

      <div style={{ position: 'relative' }}>
        <h3>Preview with Highlights:</h3>
        <div
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '100px',
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
          }}
        >
          <HighlightedText
            text={text || 'Your text will appear here with errors highlighted...'}
            spellingErrors={errors}
            grammarIssues={issues}
            onHighlightClick={handleHighlightClick}
            spellingClassName="spelling-error"
            grammarClassName="grammar-issue"
          />
        </div>

        <SuggestionPopover
          isOpen={popover.isOpen}
          anchorPosition={popover.position}
          word={popover.word}
          suggestions={popover.suggestions}
          type={popover.type}
          onSelect={handleSuggestionSelect}
          onAddToDictionary={popover.type === 'spelling' ? handleAddToDictionary : undefined}
          onIgnore={popover.type === 'spelling' ? handleIgnore : undefined}
          onClose={handleClosePopover}
        />
      </div>

      <style>{`
        .spelling-error {
          text-decoration: underline wavy red;
          cursor: pointer;
        }
        .grammar-issue {
          text-decoration: underline wavy orange;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <SpellboundProvider
      config={{
        dictionaryManager: dictManager,
        grammarCheckerOptions: {
          rules: [...builtInRules, ...confusionRules],
        },
        debounceMs: 300,
        persistUserDictionary: true,
      }}
    >
      <ProofreadingEditor />
    </SpellboundProvider>
  );
}
```

### Vanilla JavaScript Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Spellbound Demo</title>
    <style>
      .error {
        text-decoration: underline wavy red;
      }
      .issue {
        text-decoration: underline wavy orange;
      }
      .suggestion {
        cursor: pointer;
        padding: 5px;
      }
      .suggestion:hover {
        background: #eee;
      }
    </style>
  </head>
  <body>
    <textarea id="editor" rows="10" cols="50"></textarea>
    <div id="output"></div>
    <div id="suggestions"></div>

    <script type="module">
      import {
        createSpellChecker,
        createGrammarChecker,
        createDictionaryManager,
        builtInRules,
      } from '@spellbound/core';
      import dictionary from '@spellbound/dict-en-us';

      // Setup
      const dictManager = createDictionaryManager();
      dictManager.loadDictionary(dictionary);

      const spellChecker = createSpellChecker({ dictionaryManager: dictManager });
      const grammarChecker = createGrammarChecker({ rules: builtInRules });

      const editor = document.getElementById('editor');
      const output = document.getElementById('output');
      const suggestions = document.getElementById('suggestions');

      let debounceTimer;

      editor.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(checkText, 300);
      });

      function checkText() {
        const text = editor.value;

        // Spell check
        const spellErrors = spellChecker.check(text);

        // Grammar check
        const grammarResult = grammarChecker.check(text);

        // Render highlighted text
        let html = text;
        const allIssues = [
          ...spellErrors.map((e) => ({ ...e, type: 'spell', pos: e.start })),
          ...grammarResult.issues.map((i) => ({ ...i, type: 'grammar', pos: i.start })),
        ].sort((a, b) => b.pos - a.pos); // Sort descending to replace from end

        allIssues.forEach((issue) => {
          const start = issue.type === 'spell' ? issue.start : issue.start;
          const end = issue.type === 'spell' ? issue.end : issue.end;
          const word = html.slice(start, end);
          const className = issue.type === 'spell' ? 'error' : 'issue';
          html =
            html.slice(0, start) +
            `<span class="${className}" data-type="${issue.type}" data-word="${word}">${word}</span>` +
            html.slice(end);
        });

        output.innerHTML = html;

        // Show summary
        suggestions.innerHTML = `
        <p>Spelling errors: ${spellErrors.length}</p>
        <p>Grammar issues: ${grammarResult.issues.length}</p>
      `;
      }
    </script>
  </body>
</html>
```

---

## Performance Considerations

1. **Dictionary Loading**: The dictionary is ~1 MB gzipped. Load it once at app startup and cache it.

2. **Debouncing**: Always debounce spell/grammar checks (300ms recommended) to avoid checking on every keystroke.

3. **Rule Selection**: The full `importedRules` adds significant bundle size. Consider:
   - Using only `builtInRules` for lightweight checking
   - Lazy loading `importedRules` when needed
   - Using specific rule sets like `confusionRules` only

4. **Large Texts**: For texts > 10KB, consider:
   - Checking only visible portions
   - Running checks in a Web Worker
   - Implementing virtual scrolling

5. **Memory**: The Trie and BK-Tree structures use ~15MB of memory for the full dictionary.

---

## License

- **Spellbound**: MIT License
- **LanguageTool Rules**: LGPL 2.1 (rules only, not the Java code)
- **SCOWL Dictionary**: Various open licenses (see SCOWL documentation)

---

## Support

For issues and feature requests, please open an issue on the GitHub repository.
