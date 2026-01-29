import type {
  SpellChecker,
  GrammarChecker,
  DictionaryManager,
  SpellCheckResult,
  GrammarIssue,
  SpellCheckerOptions,
  GrammarCheckerOptions,
} from '@spellbound/core';

/**
 * Configuration for the Spellbound context provider
 */
export interface SpellboundConfig {
  /** Spell checker options */
  spellCheckerOptions?: SpellCheckerOptions;

  /** Grammar checker options */
  grammarCheckerOptions?: GrammarCheckerOptions;

  /** Custom dictionary manager instance */
  dictionaryManager?: DictionaryManager;

  /** Custom spell checker instance */
  spellChecker?: SpellChecker;

  /** Custom grammar checker instance */
  grammarChecker?: GrammarChecker;

  /** Debounce delay in milliseconds for checking (default: 300) */
  debounceMs?: number;

  /** Enable spell checking (default: true) */
  enableSpellCheck?: boolean;

  /** Enable grammar checking (default: true) */
  enableGrammarCheck?: boolean;

  /** Persist user dictionary to localStorage (default: false) */
  persistUserDictionary?: boolean;

  /** Storage key for user dictionary (default: 'spellbound-user-dictionary') */
  userDictionaryKey?: string;
}

/**
 * Context value provided by SpellboundProvider
 */
export interface SpellboundContextValue {
  /** The spell checker instance */
  spellChecker: SpellChecker | null;

  /** The grammar checker instance */
  grammarChecker: GrammarChecker | null;

  /** The dictionary manager instance */
  dictionaryManager: DictionaryManager | null;

  /** Whether the context is initialized and ready */
  isReady: boolean;

  /** Whether checking is in progress */
  isChecking: boolean;

  /** Check spelling of text */
  checkSpelling: (text: string) => SpellCheckResult[];

  /** Check grammar of text */
  checkGrammar: (text: string) => GrammarIssue[];

  /** Add a word to the user dictionary */
  addToUserDictionary: (word: string) => void;

  /** Remove a word from the user dictionary */
  removeFromUserDictionary: (word: string) => void;

  /** Ignore a word for the current session */
  ignoreWord: (word: string) => void;

  /** Get spelling suggestions for a word */
  getSuggestions: (word: string, limit?: number) => string[];

  /** Current configuration */
  config: SpellboundConfig;
}

/**
 * Result from the useSpellcheck hook
 */
export interface UseSpellcheckResult {
  /** Array of spelling errors */
  errors: SpellCheckResult[];

  /** Whether checking is in progress */
  isChecking: boolean;

  /** Get suggestions for a misspelled word */
  getSuggestions: (word: string, limit?: number) => string[];

  /** Add word to user dictionary */
  addToDictionary: (word: string) => void;

  /** Ignore word for session */
  ignoreWord: (word: string) => void;

  /** Manually trigger a check */
  recheck: () => void;
}

/**
 * Result from the useGrammarCheck hook
 */
export interface UseGrammarCheckResult {
  /** Array of grammar issues */
  issues: GrammarIssue[];

  /** Whether checking is in progress */
  isChecking: boolean;

  /** Manually trigger a check */
  recheck: () => void;
}

/**
 * Options for useSpellcheck hook
 */
export interface UseSpellcheckOptions {
  /** Whether checking is enabled (default: true) */
  enabled?: boolean;

  /** Debounce delay in ms (default: uses context value) */
  debounceMs?: number;
}

/**
 * Options for useGrammarCheck hook
 */
export interface UseGrammarCheckOptions {
  /** Whether checking is enabled (default: true) */
  enabled?: boolean;

  /** Debounce delay in ms (default: uses context value) */
  debounceMs?: number;
}

/**
 * Props for highlighted text position
 */
export interface HighlightPosition {
  /** Start offset in the text */
  start: number;

  /** End offset in the text */
  end: number;

  /** Type of highlight */
  type: 'spelling' | 'grammar';

  /** The error or issue data */
  data: SpellCheckResult | GrammarIssue;
}

/**
 * Props for the HighlightedText component
 */
export interface HighlightedTextProps {
  /** The text to display with highlights */
  text: string;

  /** Spelling errors to highlight */
  spellingErrors?: SpellCheckResult[];

  /** Grammar issues to highlight */
  grammarIssues?: GrammarIssue[];

  /** Custom class for spelling error highlights */
  spellingClassName?: string;

  /** Custom class for grammar issue highlights */
  grammarClassName?: string;

  /** Callback when a highlighted word is clicked */
  onHighlightClick?: (position: HighlightPosition, event: React.MouseEvent) => void;

  /** Custom render function for highlighted segments */
  renderHighlight?: (
    text: string,
    position: HighlightPosition,
    defaultElement: React.ReactNode
  ) => React.ReactNode;

  /** Additional className for the container */
  className?: string;

  /** Additional styles for the container */
  style?: React.CSSProperties;
}

/**
 * Suggestion item for the popover
 */
export interface SuggestionItem {
  /** The suggested text */
  text: string;

  /** Description or reason for the suggestion */
  description?: string;

  /** Type of suggestion */
  type: 'spelling' | 'grammar';
}

/**
 * Props for the SuggestionPopover component
 */
export interface SuggestionPopoverProps {
  /** Whether the popover is open */
  isOpen: boolean;

  /** Position to anchor the popover */
  anchorPosition: { x: number; y: number } | null;

  /** The misspelled or problematic word/phrase */
  word: string;

  /** Array of suggestions */
  suggestions: SuggestionItem[];

  /** Callback when a suggestion is selected */
  onSelect: (suggestion: SuggestionItem) => void;

  /** Callback when "Add to dictionary" is clicked */
  onAddToDictionary?: () => void;

  /** Callback when "Ignore" is clicked */
  onIgnore?: () => void;

  /** Callback when popover is closed */
  onClose: () => void;

  /** Whether this is a spelling or grammar issue */
  type: 'spelling' | 'grammar';

  /** Custom class name */
  className?: string;

  /** Maximum number of suggestions to show (default: 5) */
  maxSuggestions?: number;
}
