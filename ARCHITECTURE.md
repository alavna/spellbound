# Spellbound Architecture & Workflow

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────┐         ┌──────────────────────────────┐   │
│  │  React App /   │         │      @spellbound/core        │   │
│  │  Vanilla JS    │────────▶│                              │   │
│  └────────────────┘         │  ┌────────────────────────┐  │   │
│         │                   │  │  DictionaryManager     │  │   │
│         │                   │  │                        │  │   │
│         │                   │  │  ┌──────┐  ┌────────┐ │  │   │
│         │                   │  │  │ Trie │  │BK-Tree │ │  │   │
│         │                   │  │  └──────┘  └────────┘ │  │   │
│         │                   │  └────────────────────────┘  │   │
│         │                   │             │                │   │
│         │                   │  ┌──────────▼──────────┐    │   │
│         │                   │  │   SpellChecker      │    │   │
│         │                   │  │  - Tokenizer        │    │   │
│         │                   │  │  - SuggestionEngine │    │   │
│         │                   │  └─────────────────────┘    │   │
│         │                   │             │                │   │
│         │                   │  ┌──────────▼──────────┐    │   │
│         │                   │  │  GrammarChecker     │    │   │
│         │                   │  │  - RuleRegistry     │    │   │
│         │                   │  │  - 50+ Rules        │    │   │
│         │                   │  └─────────────────────┘    │   │
│         │                   └──────────────────────────────┘   │
│         │                              ▲                        │
│         └──────────────────────────────┘                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │            @spellbound/dict-en-us                      │    │
│  │         words.json (276,830 words)                     │    │
│  │         11 MB raw / 1.04 MB gzipped                    │    │
│  │         Cached in browser after first download         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              localStorage (Optional)                    │    │
│  │         - User dictionary                              │    │
│  │         - Ignored words                                │    │
│  │         - Rule preferences                             │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow: From Dictionary File to Spell Check

### Phase 1: Application Initialization

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. User loads app                                                │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ 2. Browser downloads words.json (1.04 MB gzipped)                │
│    - One-time download                                           │
│    - Permanently cached (Cache-Control: immutable)               │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ 3. JavaScript imports dictionary module                          │
│    import dictionary from '@spellbound/dict-en-us';             │
│                                                                   │
│    Dictionary structure:                                         │
│    {                                                             │
│      version: 1,                                                 │
│      language: "en-us",                                          │
│      words: [                                                    │
│        ["the", 100000000],    ← [word, frequency]               │
│        ["be", 50000000],                                         │
│        ...276,830 more words                                     │
│      ]                                                           │
│    }                                                             │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ 4. Create DictionaryManager                                      │
│    const dictManager = createDictionaryManager();                │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ 5. Load dictionary into memory structures                        │
│    dictManager.loadDictionary(dictionary);                       │
│                                                                   │
│    This builds TWO data structures:                              │
│    ┌────────────────────────────────────────────────────────┐  │
│    │ TRIE (Prefix Tree)                                      │  │
│    │ ├─ Root                                                 │  │
│    │ ├── t                                                   │  │
│    │ │   ├── h                                               │  │
│    │ │   │   └── e [freq: 100000000] ✓ (word ends here)    │  │
│    │ │   ├── e                                               │  │
│    │ │   │   └── s                                           │  │
│    │ │   │       └── t [freq: 8500000] ✓                    │  │
│    │ │   └── o [freq: 45000000] ✓                           │  │
│    │ └── ...                                                 │  │
│    │                                                          │  │
│    │ Purpose: O(m) exact word lookups (m = word length)      │  │
│    │ Time: ~200-500ms to build                               │  │
│    │ Memory: ~30-50 MB                                        │  │
│    └────────────────────────────────────────────────────────┘  │
│                                                                   │
│    ┌────────────────────────────────────────────────────────┐  │
│    │ BK-TREE (Burkhard-Keller Tree)                          │  │
│    │ Organized by edit distance for fuzzy matching           │  │
│    │                                                          │  │
│    │         "test"                                           │  │
│    │        /  |  \                                           │  │
│    │       /   |   \                                          │  │
│    │   d=1   d=2   d=3                                        │  │
│    │   /      |      \                                        │  │
│    │ "best" "text"  "tease"                                   │  │
│    │  /  \                                                    │  │
│    │ ... ...                                                  │  │
│    │                                                          │  │
│    │ Purpose: Find similar words within edit distance         │  │
│    │ Time: ~300-700ms to build                               │  │
│    │ Memory: ~20-30 MB                                        │  │
│    └────────────────────────────────────────────────────────┘  │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ 6. Create SpellChecker & GrammarChecker                          │
│    const spellChecker = createSpellChecker({                    │
│      dictionaryManager: dictManager                             │
│    });                                                           │
│    const grammarChecker = createGrammarChecker();               │
│                                                                   │
│    ✅ System ready! Total init time: 500-1200ms                 │
└──────────────────────────────────────────────────────────────────┘
```

### Phase 2: Spell Checking (Real-time)

```
┌──────────────────────────────────────────────────────────────────┐
│ User types: "This is a tset with som errors"                     │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1: Tokenization                                             │
│ ─────────────────────────────────────────────────────────────── │
│ const tokens = tokenizer.extractWords(text);                     │
│                                                                   │
│ Input:  "This is a tset with som errors"                         │
│ Output: [                                                         │
│   { value: "This", start: 0, end: 4 },                          │
│   { value: "is", start: 5, end: 7 },                            │
│   { value: "a", start: 8, end: 9 },                             │
│   { value: "tset", start: 10, end: 14 },  ← Misspelled         │
│   { value: "with", start: 15, end: 19 },                        │
│   { value: "som", start: 20, end: 23 },   ← Misspelled         │
│   { value: "errors", start: 24, end: 30 }                       │
│ ]                                                                 │
│                                                                   │
│ Smart tokenization skips:                                        │
│ - URLs: www.example.com                                          │
│ - Emails: user@example.com                                       │
│ - Code blocks: `function test() {}`                              │
│ - Numbers: 123, 1.23                                             │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 2: Word Validation (for each token)                         │
│ ─────────────────────────────────────────────────────────────── │
│ for (const token of tokens) {                                    │
│   const isCorrect = dictionary.has(token.value);                │
│ }                                                                 │
│                                                                   │
│ Example: Checking "tset"                                          │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ 1. Normalize: "tset" → "tset" (lowercase if ignoreCase)  │    │
│ │                                                           │    │
│ │ 2. Trie lookup (O(4) = 4 character comparisons):         │    │
│ │    Root → t → s → e → t                                  │    │
│ │    Result: NOT FOUND (no word marker at final 't')       │    │
│ │                                                           │    │
│ │ 3. Decision: ❌ Misspelled                               │    │
│ │    Time: ~0.001 ms                                        │    │
│ └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│ Example: Checking "this"                                          │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ 1. Normalize: "This" → "this"                            │    │
│ │                                                           │    │
│ │ 2. Trie lookup:                                           │    │
│ │    Root → t → h → i → s ✓ (word marker found)           │    │
│ │    Frequency: 16000000                                    │    │
│ │                                                           │    │
│ │ 3. Decision: ✅ Correct                                  │    │
│ │    Time: ~0.001 ms                                        │    │
│ └──────────────────────────────────────────────────────────┘    │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 3: Suggestion Generation (for misspelled words)             │
│ ─────────────────────────────────────────────────────────────── │
│ const suggestions = suggestionEngine.getSuggestions(             │
│   "tset",                                                         │
│   dictionary,                                                     │
│   { maxSuggestions: 5, maxEditDistance: 2 }                     │
│ );                                                                │
│                                                                   │
│ Sub-step 3.1: BK-Tree Search                                      │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ Find words within edit distance 2 of "tset"              │    │
│ │                                                           │    │
│ │ BK-Tree traversal (pruning branches > distance 2):       │    │
│ │ - "test" → edit distance 1 ✓                             │    │
│ │ - "set"  → edit distance 1 ✓                             │    │
│ │ - "text" → edit distance 2 ✓                             │    │
│ │ - "best" → edit distance 2 ✓                             │    │
│ │ - "jest" → edit distance 2 ✓                             │    │
│ │ - "rest" → edit distance 2 ✓                             │    │
│ │ - "west" → edit distance 2 ✓                             │    │
│ │ - "vest" → edit distance 2 ✓                             │    │
│ │ ... many more candidates                                  │    │
│ │                                                           │    │
│ │ Time: ~1-3 ms (logarithmic search)                        │    │
│ └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│ Sub-step 3.2: Ranking Algorithms                                  │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ For each candidate, calculate score:                      │    │
│ │                                                           │    │
│ │ 1. Levenshtein Distance (edit operations)                 │    │
│ │    "tset" → "test": 1 substitution (s→s, e→e, s→t, t→t)  │    │
│ │    Lower = Better                                         │    │
│ │                                                           │    │
│ │ 2. Damerau-Levenshtein (includes transpositions)          │    │
│ │    "tset" → "test": Same as above                         │    │
│ │    "teh" → "the": 1 transposition (better than 2 ops)    │    │
│ │                                                           │    │
│ │ 3. Phonetic Similarity                                     │    │
│ │    Soundex("tset") = T230                                 │    │
│ │    Soundex("test") = T230 ← MATCH!                        │    │
│ │    Metaphone("tset") = TST                                │    │
│ │    Metaphone("test") = TST ← MATCH!                       │    │
│ │                                                           │    │
│ │ 4. Frequency Bonus                                         │    │
│ │    "test": freq = 8500000 → high bonus                    │    │
│ │    "jest": freq = 120000  → medium bonus                  │    │
│ │    "vest": freq = 45000   → low bonus                     │    │
│ │                                                           │    │
│ │ Combined Score Formula:                                    │    │
│ │ score = (1 / editDistance) * log(frequency) * phoneticBonus│  │
│ │                                                           │    │
│ │ Sorted results:                                            │    │
│ │ 1. "test"  (score: 18.5) ← Best match                    │    │
│ │ 2. "set"   (score: 16.2)                                  │    │
│ │ 3. "jest"  (score: 14.8)                                  │    │
│ │ 4. "rest"  (score: 14.5)                                  │    │
│ │ 5. "best"  (score: 14.1)                                  │    │
│ │                                                           │    │
│ │ Time: ~2-5 ms                                              │    │
│ └──────────────────────────────────────────────────────────┘    │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 4: Return Results                                            │
│ ─────────────────────────────────────────────────────────────── │
│ return [                                                          │
│   {                                                              │
│     word: "tset",                                                │
│     start: 10,                                                   │
│     end: 14,                                                     │
│     suggestions: ["test", "set", "jest", "rest", "best"]        │
│   },                                                             │
│   {                                                              │
│     word: "som",                                                 │
│     start: 20,                                                   │
│     end: 23,                                                     │
│     suggestions: ["some", "sum", "soum", "som", "soam"]         │
│   }                                                              │
│ ];                                                               │
│                                                                   │
│ Total time: ~5-10 ms for entire text                            │
└──────────────────────────────────────────────────────────────────┘
```

### Phase 3: Grammar Checking (Independent Process)

```
┌──────────────────────────────────────────────────────────────────┐
│ Input: "Their going to the store."                               │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 1: Apply Rule Registry                                      │
│ ─────────────────────────────────────────────────────────────── │
│ Grammar checking is RULE-BASED (no dictionary needed)            │
│                                                                   │
│ For each of 50+ rules:                                           │
│   1. Check if rule is enabled                                    │
│   2. Apply rule pattern to text                                  │
│   3. If match found, create GrammarIssue                         │
│                                                                   │
│ Example Rule: their-vs-theyre                                     │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ Pattern: /\b(their|there|they're)\s+(going|coming|being)/│    │
│ │                                                           │    │
│ │ Check: "Their going to the store"                        │    │
│ │ Match: ✓ Found "Their going" at position 0-11            │    │
│ │                                                           │    │
│ │ Analysis:                                                 │    │
│ │ - Word: "Their" (possessive)                             │    │
│ │ - Context: "going" (verb)                                 │    │
│ │ - Correct form: "They're" (they are going)               │    │
│ │                                                           │    │
│ │ Result:                                                   │    │
│ │ {                                                         │    │
│ │   rule: "their-vs-theyre",                               │    │
│ │   category: "common-mistakes",                           │    │
│ │   message: "Did you mean 'They're' (they are)?",         │    │
│ │   start: 0,                                               │    │
│ │   end: 5,                                                 │    │
│ │   suggestions: ["They're"],                              │    │
│ │   severity: "warning"                                     │    │
│ │ }                                                         │    │
│ └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│ 50+ Rules Applied in Categories:                                 │
│ - Capitalization (sentence start, proper nouns)                  │
│ - Punctuation (spacing, commas)                                  │
│ - Common mistakes (could of → could have)                        │
│ - Repetition (duplicate words)                                   │
│ - Agreement (subject-verb, article-noun)                         │
│ - Typography (quotes, dashes)                                    │
│                                                                   │
│ Time: ~5-20 ms for typical text                                  │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│ STEP 2: Return Grammar Issues                                    │
│ ─────────────────────────────────────────────────────────────── │
│ return {                                                          │
│   text: "Their going to the store.",                            │
│   issues: [                                                      │
│     {                                                            │
│       rule: "their-vs-theyre",                                   │
│       message: "Did you mean 'They're' (they are)?",            │
│       start: 0,                                                  │
│       end: 5,                                                    │
│       suggestions: ["They're"]                                   │
│     }                                                            │
│   ],                                                             │
│   stats: { totalRulesApplied: 53, issuesFound: 1 }             │
│ };                                                               │
└──────────────────────────────────────────────────────────────────┘
```

## Performance Timeline

```
Time →

App Load:
├─ 0ms:    User opens app
├─ 50ms:   JS bundle loaded
├─ 100ms:  React app renders
├─ 200ms:  Dictionary download starts (1.04 MB gzipped)
├─ 500ms:  Dictionary downloaded (cached permanently)
├─ 550ms:  Building Trie...
├─ 800ms:  Building BK-Tree...
├─ 1000ms: ✅ System ready!

First Check:
├─ 0ms:    User types text
├─ 1ms:    Tokenization complete
├─ 3ms:    Spell check complete (10 words)
├─ 8ms:    Grammar check complete (50+ rules)
├─ 10ms:   ✅ Results rendered in UI

Subsequent Checks:
├─ 0ms:    User types more text
├─ 5ms:    ✅ Results updated (cached data structures)
```

## Memory Layout

```
Browser Memory:
├─ Dictionary (loaded once, persists):
│  ├─ Trie:         ~30-50 MB
│  ├─ BK-Tree:      ~20-30 MB
│  └─ Word List:    ~15-20 MB
│
├─ Grammar Rules:   ~1-2 MB
├─ User Dictionary: ~0.1-1 MB
├─ Temporary Data:  ~1-5 MB
└─ Total:           ~67-108 MB
```

## Key Optimizations

1. **One-time Download**: 1.04 MB dictionary downloaded once, cached forever
2. **Fast Lookups**: Trie provides O(m) lookups (m = word length)
3. **Smart Suggestions**: BK-Tree + multiple ranking algorithms
4. **No Server Calls**: Everything runs locally = privacy + speed
5. **Incremental Checking**: Only re-check modified text sections
6. **Web Worker Ready**: Can run in background thread for large documents

## Comparison to Server-Based Solutions

| Feature       | Spellbound (Client) | Grammarly (Server)   |
| ------------- | ------------------- | -------------------- |
| Initial load  | 1.04 MB one-time    | Continuous API calls |
| Privacy       | 100% private        | Text sent to server  |
| Offline       | ✅ Yes              | ❌ No                |
| Latency       | <10ms               | 100-500ms            |
| Cost          | Free                | API costs            |
| Customization | Full control        | Limited              |
