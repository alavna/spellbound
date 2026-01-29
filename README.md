# 🔮 Spellbound

A privacy-first, offline-capable spell checker and grammar checker for JavaScript/TypeScript applications. Perfect for building writing assistants like Grammarly that run entirely in the user's browser.

## Features

- ✅ **100% client-side** - All processing happens in the browser
- ✅ **No external API calls** - Your data stays private
- ✅ **Offline support** - Works without internet connection
- ✅ **Comprehensive dictionary** - 276,830 words with frequency data
- ✅ **1,800+ grammar rules** - Extensive coverage of writing mistakes
- ✅ **Extensible** - Add custom words and grammar rules
- ✅ **TypeScript-first** - Full type safety
- ✅ **Framework agnostic** - Core library works anywhere
- ✅ **React bindings** - Hooks and components for React apps
- ✅ **Optimized for download** - 1.04 MB gzipped (one-time download)

## Packages

| Package                  | Description                                         | Size (gzipped) |
| ------------------------ | --------------------------------------------------- | -------------- |
| `@spellbound/core`       | Core spell checking and grammar checking engine     | ~73 KB         |
| `@spellbound/react`      | React hooks and components                          | ~18 KB         |
| `@spellbound/dict-en-us` | Comprehensive US English dictionary (276,830 words) | ~1.04 MB       |

**Total bundle size:** ~1.13 MB gzipped (one-time download, cached by browser)

## Installation

```bash
# Core library
npm install @spellbound/core @spellbound/dict-en-us

# For React applications
npm install @spellbound/react
```

## Quick Start

### Vanilla JavaScript/TypeScript

```typescript
import {
  createSpellChecker,
  createGrammarChecker,
  createDictionaryManager,
  loadDictionary,
} from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

// Initialize dictionary
const dictManager = createDictionaryManager();
await dictManager.loadDictionary(dictionary);

// Create spell checker
const spellChecker = createSpellChecker(dictManager);

// Check spelling
const text = 'This is a tset with som errors';
const errors = spellChecker.check(text);
// [{ word: "tset", start: 10, end: 14, suggestions: ["test", "set", ...] },
//  { word: "som", start: 20, end: 23, suggestions: ["some", "sum", ...] }]

// Get suggestions
const suggestions = spellChecker.suggest('tset', 5);
// ["test", "set", "jest", ...]

// Create grammar checker
const grammarChecker = createGrammarChecker();

// Check grammar
const grammarIssues = grammarChecker.check('Their going to the store.');
// [{ rule: "their-vs-theyre", message: "Did you mean 'They're'?", ... }]
```

### React

```tsx
import {
  SpellboundProvider,
  useSpellcheck,
  useGrammarCheck,
  HighlightedText,
  SuggestionPopover,
} from '@spellbound/react';
import dictionary from '@spellbound/dict-en-us';

function App() {
  return (
    <SpellboundProvider>
      <Editor />
    </SpellboundProvider>
  );
}

function Editor() {
  const [text, setText] = useState('');
  const { errors, getSuggestions, addToDictionary, ignoreWord } = useSpellcheck(text);
  const { issues } = useGrammarCheck(text);

  const [popover, setPopover] = useState({ isOpen: false, position: null, word: '' });

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />

      <div>
        <HighlightedText
          text={text}
          spellingErrors={errors}
          grammarIssues={issues}
          onHighlightClick={(position, event) => {
            setPopover({
              isOpen: true,
              position: { x: event.clientX, y: event.clientY },
              word: text.slice(position.start, position.end),
              type: position.type,
              data: position.data,
            });
          }}
        />
      </div>

      <SuggestionPopover
        isOpen={popover.isOpen}
        anchorPosition={popover.position}
        word={popover.word}
        type={popover.type}
        suggestions={
          popover.type === 'spelling'
            ? getSuggestions(popover.word).map((s) => ({ text: s, type: 'spelling' }))
            : (popover.data?.suggestions?.map((s) => ({ text: s, type: 'grammar' })) ?? [])
        }
        onSelect={(suggestion) => {
          // Replace text with suggestion
          setPopover({ isOpen: false });
        }}
        onAddToDictionary={() => {
          addToDictionary(popover.word);
          setPopover({ isOpen: false });
        }}
        onIgnore={() => {
          ignoreWord(popover.word);
          setPopover({ isOpen: false });
        }}
        onClose={() => setPopover({ isOpen: false })}
      />
    </div>
  );
}
```

## Adding Custom Words

```typescript
// Add to user dictionary (persisted if configured)
dictManager.addUserWord('customword');

// Add with frequency (affects suggestion ranking)
dictManager.addUserWord('brandname', 500000);

// Remove from user dictionary
dictManager.removeUserWord('customword');
```

## Creating Custom Grammar Rules

### TypeScript Rules (Recommended)

```typescript
import type { GrammarRule } from '@spellbound/core';

const customRule: GrammarRule = {
  id: 'my-company-style',
  name: 'Company Style Guide',
  description: 'Enforces company writing style',
  category: 'style',
  severity: 'suggestion',

  check(text, context) {
    const issues = [];

    // Example: Flag passive voice
    const passivePattern = /\b(is|are|was|were|been|being)\s+(\w+ed)\b/gi;
    let match;

    while ((match = passivePattern.exec(text)) !== null) {
      issues.push({
        range: { start: match.index, end: match.index + match[0].length },
        message: 'Consider using active voice',
        suggestions: [],
      });
    }

    return issues;
  },
};

// Register the rule
grammarChecker.registerRule(customRule);
```

### JSON Pattern Rules (Simple cases)

```typescript
const jsonRule = {
  id: 'avoid-very',
  name: 'Avoid Very',
  description: 'Suggests stronger alternatives to "very + adjective"',
  category: 'style',
  severity: 'suggestion',
  pattern: {
    type: 'regex',
    regex: '\\bvery (good|bad|big|small)\\b',
    flags: 'gi',
  },
  replacements: {
    'very good': ['excellent', 'great', 'superb'],
    'very bad': ['terrible', 'awful', 'dreadful'],
    'very big': ['huge', 'enormous', 'massive'],
    'very small': ['tiny', 'minuscule', 'minute'],
  },
};

grammarChecker.registerRule(jsonRule);
```

## Configuration Options

### Spell Checker Options

```typescript
const spellChecker = createSpellChecker(dictManager, {
  maxSuggestions: 5, // Maximum suggestions per word
  maxEditDistance: 2, // Maximum Levenshtein distance
  caseSensitive: false, // Case sensitivity
  ignoreAllCaps: true, // Ignore ALLCAPS words
  ignoreWordsWithNumbers: true, // Ignore words like "h2o"
});
```

### Grammar Checker Options

```typescript
const grammarChecker = createGrammarChecker({
  enabledCategories: ['spelling', 'grammar', 'punctuation'],
  disabledRules: ['oxford-comma'], // Disable specific rules
  severity: 'warning', // Minimum severity to report
});
```

### Persistence

```typescript
const dictManager = createDictionaryManager({
  persist: true, // Enable localStorage persistence
  storageKey: 'my-app-user-dictionary', // Custom storage key
});
```

## Built-in Grammar Rules

Spellbound includes **1,800+ grammar rules** covering:

- **Grammar** (1,562 rules): Comprehensive grammar checking including verb forms, tenses, word order, and more
- **Style** (210 rules): Writing style improvements, wordiness, clarity suggestions
- **Compounds** (27 rules): Hyphenation and compound word rules
- **Confusion Sets** (26 rules): Commonly confused words (their/they're/there, your/you're, etc.)
- **Built-in** (7 rules): Capitalization, punctuation, articles, repetition, agreement, typography

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- Dictionary lookup: O(m) where m = word length (Trie-based)
- Fuzzy matching: O(n × d²) where n = dictionary size, d = max edit distance (BK-Tree)
- Grammar checking: O(n × r) where n = text length, r = number of rules

Typical performance on modern hardware:

- Spell check 1000 words: ~5ms
- Grammar check 1000 words: ~15ms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/spellbound.git
cd spellbound

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run the demo app
cd examples/blocknote-demo
pnpm dev
```

## Acknowledgments

Spellbound builds upon the work of several open-source projects:

### Dictionary Data
- **[SCOWL](http://wordlist.aspell.net/)** - Spell Checker Oriented Word Lists by Kevin Atkinson. The comprehensive word list that powers our spell checking.

### Grammar Rules  
- **[LanguageTool](https://github.com/languagetool-org/languagetool)** - An Open Source proofreading software. Some grammar rules are derived from LanguageTool and used under LGPL-2.1. © Daniel Naber, Marcin Miłkowski, and contributors.

### Inspiration
- **[Hunspell](https://hunspell.github.io/)** - The most widely used spell checker
- **[write-good](https://github.com/btford/write-good)** - Naive linter for English prose

We are grateful to all the contributors and maintainers of these projects.

## License

MIT License - see [LICENSE](LICENSE) for details.

### Third-Party Licenses

This project includes components under different licenses:

| Component | License | Notes |
|-----------|---------|-------|
| Spellbound (this project) | MIT | Core library code |
| Dictionary data (SCOWL) | SCOWL License | Permissive, attribution required |
| Grammar rules (LanguageTool) | LGPL-2.1 | Derived rules, source available |

See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) for full details and [NOTICE](NOTICE) for attribution.
