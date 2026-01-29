# BlockNote + Spellbound Demo

A demonstration of Spellbound's spell and grammar checking integrated with BlockNote, a Notion-like block editor.

## Features

### Detection
- **Real-time spell checking** - Catches misspellings as you type
- **Grammar checking** - Detects common grammar mistakes using 14,663+ rules
- **Privacy-first** - All processing happens in your browser, nothing sent to servers

### Fixing
- **Click to fix** - Click any suggestion to apply the fix instantly
- **Fix All** - One-click button to fix all issues using the first suggestion
- **Fix by type** - Separate buttons to fix all spelling or all grammar issues
- **Autocorrect** - Automatic correction of common typos as you type (toggleable)

### Word Management
- **Ignore** - Ignore a word for the current session
- **Add to Dictionary** - Add words to your personal dictionary
- **Personal Dictionary Panel** - View all words you've added

### Statistics
- **Fix counter** - Track how many issues have been fixed (spelling, grammar, autocorrected)
- **Issue counter** - See remaining issues at a glance

## Test Scenarios
Pre-built examples showcasing different error types:
- Business Email (professional communication errors)
- Academic Writing (research paper mistakes)
- Blog Post (casual writing errors)
- Commonly Confused Words (their/there, affect/effect)
- Creative Writing (narrative errors)
- Compound Words (backfire, nonetheless)

## Running the Demo

```bash
# From the root of the monorepo
pnpm install
pnpm build

# Then run the demo
cd examples/blocknote-demo
pnpm dev
```

Open http://localhost:5173 in your browser.

## Usage Guide

### Basic Spell/Grammar Checking
1. **Type in the editor** - Issues are detected in real-time (500ms debounce)
2. **Load test scenarios** - Click any scenario button to load pre-written text with errors
3. **View issues** - The Issues panel shows all detected problems with suggestions

### Fixing Issues
1. **Individual fix** - Click a suggestion button (e.g., "receive") to fix that specific word
2. **Fix All** - Click "Fix All" in the toolbar to fix all issues at once
3. **Fix by type** - Use "Fix Spelling" or "Fix Grammar" to fix specific issue types

### Autocorrect
1. **Toggle** - Use the checkbox in the toolbar to enable/disable autocorrect
2. **Automatic fixes** - Common typos are corrected automatically after pressing space
3. **Examples** - Type "teh" (→ "the"), "recieve" (→ "receive"), "definately" (→ "definitely")

### Word Management
1. **Ignore** - Click "Ignore" to hide a word from the issues list for this session
2. **Add to Dictionary** - Click "Add to Dictionary" to permanently add a word (spelling only)
3. **View dictionary** - Added words appear in the Personal Dictionary panel

## Autocorrect Word List

The demo includes 90+ common autocorrections:
- Contractions: `dont` → `don't`, `cant` → `can't`, `wont` → `won't`
- Pronouns: `im` → `I'm`, `youre` → `you're`, `theyre` → `they're`
- Common typos: `teh` → `the`, `taht` → `that`, `adn` → `and`
- Misspellings: `recieve` → `receive`, `beleive` → `believe`, `definately` → `definitely`

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BlockNote Editor                        │
│  (Rich text editing with blocks, formatting, collaboration)  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Text Extraction                           │
│        (Extract plain text from BlockNote blocks)            │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌───────────────────────┐   ┌───────────────────────┐
│    @spellbound/core   │   │    @spellbound/core   │
│     SpellChecker      │   │    GrammarChecker     │
│   (276,830 words)     │   │   (14,663 rules)      │
└───────────────────────┘   └───────────────────────┘
                    │                   │
                    └─────────┬─────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Issues Panel                             │
│   • Suggestions with click-to-fix                            │
│   • Ignore / Add to Dictionary buttons                       │
│   • Fix All / Fix by Type toolbar                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Autocorrect Engine                          │
│      (90+ common typos auto-fixed on space)                  │
└─────────────────────────────────────────────────────────────┘
```

## Technologies Used

- **Vite** - Fast development server
- **React 18** - UI framework
- **BlockNote** - Notion-like block editor
- **Mantine** - UI component library (for BlockNote styling)
- **@spellbound/core** - Spell and grammar checking engine
- **@spellbound/dict-en-us** - 276,830 word English dictionary
