// Context and Provider
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

// Types
export type {
  SpellboundConfig,
  SpellboundContextValue,
  UseSpellcheckResult,
  UseSpellcheckOptions,
  UseGrammarCheckResult,
  UseGrammarCheckOptions,
  HighlightedTextProps,
  HighlightPosition,
  SuggestionItem,
  SuggestionPopoverProps,
} from './types';

// Re-export core types for convenience
export type {
  SpellCheckResult,
  GrammarCheckResult,
  SpellCheckerOptions,
  GrammarCheckerOptions,
  GrammarRule,
  IssueSeverity,
  IssueCategory,
} from '@spellbound/core';
