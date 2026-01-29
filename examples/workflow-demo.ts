/**
 * Spellbound Workflow Example
 *
 * This file demonstrates the complete workflow from loading the dictionary
 * to performing spell checks and grammar checks.
 */

import {
  createDictionaryManager,
  createSpellChecker,
  createGrammarChecker,
} from '@spellbound/core';
import dictionary from '@spellbound/dict-en-us';

// ============================================================================
// STEP 1: DICTIONARY LOADING
// ============================================================================
//
// The words.json file (276,830 words, 11 MB raw) is imported as a JavaScript
// module. When the user first loads your app, the browser downloads this file
// once and caches it permanently.
//
// Data structure in words.json:
// {
//   "words": [
//     ["the", 100000000],    // [word, frequency]
//     ["be", 50000000],
//     ["to", 45000000],
//     ...
//   ]
// }

console.log('📦 Dictionary loaded from import:');
console.log(`   Words: ${dictionary.words.length.toLocaleString()}`);
console.log(`   Language: ${dictionary.language}`);
console.log(`   Has frequency data: ${dictionary.hasFrequency}`);

// ============================================================================
// STEP 2: BUILD IN-MEMORY DATA STRUCTURES
// ============================================================================
//
// The DictionaryManager takes the words.json data and builds TWO optimized
// data structures in memory:
//
// 1. TRIE (Prefix Tree):
//    - Used for O(m) word lookups where m = word length
//    - Stores frequency data for ranking suggestions
//    - Example: "cat" -> c -> a -> t (with frequency)
//
// 2. BK-TREE (Burkhard-Keller Tree):
//    - Used for fuzzy matching (finding words within edit distance)
//    - Enables fast suggestion generation
//    - Example: "tst" finds "test", "tast", "twist" etc.

console.log('\n🏗️  Building in-memory data structures...');
const dictManager = createDictionaryManager();
dictManager.loadDictionary(dictionary);

console.log('   ✅ Trie built for exact lookups');
console.log('   ✅ BK-Tree built for fuzzy matching');
console.log(`   Total words indexed: ${dictManager.size.toLocaleString()}`);

// ============================================================================
// STEP 3: SPELL CHECKING WORKFLOW
// ============================================================================
//
// When user types text, here's what happens:
//
// 1. TOKENIZATION:
//    - Text is split into tokens (words, URLs, emails, etc.)
//    - Smart tokenization skips URLs, emails, code blocks
//    - Example: "Check www.example.com" -> ["Check"] (URL ignored)
//
// 2. WORD VALIDATION:
//    - Each word is checked against the Trie
//    - O(m) lookup time where m = word length
//    - Case normalization happens automatically
//
// 3. SUGGESTION GENERATION (for misspelled words):
//    - BK-Tree finds words within edit distance (default: 2)
//    - Multiple algorithms rank suggestions:
//      * Levenshtein distance (insertions, deletions, substitutions)
//      * Damerau-Levenshtein (includes transpositions: "teh" -> "the")
//      * Phonetic matching (Soundex, Metaphone: "nite" -> "night")
//      * Frequency ranking (common words ranked higher)

console.log('\n🔍 Spell checking workflow:');

const spellChecker = createSpellChecker({
  dictionaryManager: dictManager,
  maxSuggestions: 5,
  maxEditDistance: 2,
});

const textToCheck = `
This is a tset with som spelling erors. 
I can spel most words correctly, but occassionally make mistaks.
`;

console.log('\n📝 Input text:');
console.log(textToCheck);

console.log('\n⚡ Processing steps:');

// Step 3.1: Tokenization
console.log('   1. Tokenization:');
console.log('      Split text into words, ignore punctuation');
console.log('      Tokens: ["This", "is", "a", "tset", "with", "som", ...]');

// Step 3.2: Check each word
console.log('\n   2. Word validation:');
const errors = spellChecker.check(textToCheck);

errors.forEach((error) => {
  console.log(`      ❌ "${error.word}" at position ${error.start}-${error.end}`);
  console.log(`         Trie lookup: NOT FOUND`);
  console.log(`         BK-Tree search for similar words...`);
});

// Step 3.3: Generate suggestions
console.log('\n   3. Suggestion generation:');
errors.forEach((error) => {
  console.log(`\n      Word: "${error.word}"`);
  console.log(`      Top suggestions:`);
  error.suggestions?.slice(0, 3).forEach((sugg, i) => {
    console.log(`         ${i + 1}. "${sugg}"`);
  });
});

// ============================================================================
// STEP 4: GRAMMAR CHECKING WORKFLOW
// ============================================================================
//
// Grammar checking is RULE-BASED and independent of the dictionary:
//
// 1. PATTERN MATCHING:
//    - Text is matched against 1,800+ grammar rules
//    - Rules use regex patterns and token sequences
//    - Example rule: "their going" -> "they're going"
//
// 2. RULE CATEGORIES:
//    - Capitalization (sentence start, proper nouns)
//    - Punctuation (missing commas, double spaces)
//    - Common mistakes ("could of" -> "could have")
//    - Agreement (subject-verb, article-noun)
//    - Repetition (duplicate words)
//    - Typography (smart quotes, dashes)
//
// 3. RULE EXECUTION:
//    - Each rule is checked against the text
//    - Rules can be enabled/disabled individually
//    - Matches return position, message, and suggested fix

console.log('\n\n📋 Grammar checking workflow:');

const grammarChecker = createGrammarChecker();

const grammarText = `
Their going to the store. I should of told them about the the duplicate words.
This sentence don't have proper agreement.
`;

console.log('\n📝 Input text:');
console.log(grammarText);

console.log('\n⚡ Processing steps:');
console.log('   1. Apply grammar rules:');
console.log('      - Check "their/there/they\'re" rule');
console.log('      - Check "should of/should have" rule');
console.log('      - Check duplicate words rule');
console.log('      - Check subject-verb agreement');

const result = grammarChecker.check(grammarText);

console.log('\n   2. Found issues:');
result.issues.forEach((issue) => {
  console.log(`      ❌ ${issue.message}`);
  console.log(`         Position: ${issue.start}-${issue.end}`);
  console.log(`         Text: "${grammarText.substring(issue.start, issue.end)}"`);
  if (issue.suggestions) {
    console.log(`         Suggestion: "${issue.suggestions[0]}"`);
  }
});

// ============================================================================
// STEP 5: USER DICTIONARY (CUSTOM WORDS)
// ============================================================================
//
// Users can add custom words to their personal dictionary:
// - Words are stored in the same Trie/BK-Tree structures
// - Optionally persisted to localStorage
// - Survives browser refresh

console.log('\n\n📚 User dictionary workflow:');

console.log('   Adding custom words...');
spellChecker.addToUserDictionary('blockchain');
spellChecker.addToUserDictionary('cryptocurrency');
spellChecker.addToUserDictionary('TypeScript');

console.log('   ✅ Words added to Trie and BK-Tree');
console.log('   ✅ Saved to localStorage (if persistence enabled)');

const customText = 'I love TypeScript and blockchain technology!';
const customErrors = spellChecker.check(customText);

console.log(`\n   Checking: "${customText}"`);
console.log(`   Errors found: ${customErrors.length}`);
console.log('   ✅ All words recognized (including custom words)');

// ============================================================================
// STEP 6: PERFORMANCE CHARACTERISTICS
// ============================================================================

console.log('\n\n⚡ Performance characteristics:');
console.log('   Initial load:');
console.log('      - Download dictionary: 1.04 MB gzipped (one-time)');
console.log('      - Build Trie: ~200-500ms for 276k words');
console.log('      - Build BK-Tree: ~300-700ms for 276k words');
console.log('      - Total initialization: ~500-1200ms');
console.log('      - Memory usage: ~50-100 MB');
console.log('');
console.log('   Per-check performance:');
console.log('      - Word lookup: O(m) where m = word length (~0.001ms)');
console.log('      - Suggestion generation: O(log n) where n = dictionary size (~1-5ms)');
console.log('      - Grammar check: O(r*t) where r = rules, t = text length (~5-20ms)');
console.log('      - Typical 1000-word document: ~50-100ms total');

// ============================================================================
// STEP 7: OPTIMIZATION STRATEGIES
// ============================================================================

console.log('\n\n🚀 Optimization strategies:');
console.log('   1. Lazy loading:');
console.log('      - Load dictionary only when needed');
console.log('      - Use dynamic import() for code splitting');
console.log('');
console.log('   2. Web Worker:');
console.log('      - Run spell/grammar checks in background thread');
console.log('      - Keep UI responsive during checking');
console.log('');
console.log('   3. Debouncing:');
console.log('      - Wait 300-500ms after typing stops');
console.log('      - Batch multiple changes together');
console.log('');
console.log('   4. Progressive checking:');
console.log('      - Check visible text first');
console.log('      - Check rest of document in chunks');
console.log('');
console.log('   5. Caching:');
console.log('      - Cache checked paragraphs (hash-based)');
console.log('      - Only re-check modified sections');

// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n\n📊 WORKFLOW SUMMARY:');
console.log('');
console.log('User types text:');
console.log('   ↓');
console.log('1. Tokenize text into words');
console.log('   ↓');
console.log('2. For each word:');
console.log('   ├─ Lookup in Trie (O(m)) - Is it spelled correctly?');
console.log('   └─ If not found:');
console.log('      └─ Search BK-Tree for similar words (O(log n))');
console.log('         └─ Rank by edit distance + frequency + phonetics');
console.log('   ↓');
console.log('3. Apply grammar rules:');
console.log('   ├─ Pattern matching against 50+ rules');
console.log('   └─ Return matches with positions and suggestions');
console.log('   ↓');
console.log('4. Return results to UI:');
console.log('   ├─ Spelling errors with suggestions');
console.log('   └─ Grammar issues with explanations');
console.log('   ↓');
console.log('5. User interactions:');
console.log('   ├─ Accept suggestion → Replace text');
console.log('   ├─ Add to dictionary → Update Trie/BK-Tree + localStorage');
console.log('   └─ Ignore → Add to temporary ignore list');

console.log('\n✨ Done! The dictionary stays in memory for instant lookups.');
