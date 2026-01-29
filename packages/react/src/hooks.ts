import { useState, useEffect, useCallback, useRef } from 'react';
import { useSpellboundContext } from './context';
import type {
  UseSpellcheckResult,
  UseSpellcheckOptions,
  UseGrammarCheckResult,
  UseGrammarCheckOptions,
} from './types';
import type { SpellCheckResult, GrammarIssue } from '@spellbound/core';

/**
 * Debounce utility
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for spell checking text
 *
 * @example
 * ```tsx
 * function Editor() {
 *   const [text, setText] = useState('');
 *   const { errors, getSuggestions, addToDictionary } = useSpellcheck(text);
 *
 *   return (
 *     <div>
 *       <textarea value={text} onChange={e => setText(e.target.value)} />
 *       {errors.map(error => (
 *         <div key={`${error.start}-${error.end}`}>
 *           {error.word} - Suggestions: {getSuggestions(error.word).join(', ')}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useSpellcheck(
  text: string,
  options: UseSpellcheckOptions = {}
): UseSpellcheckResult {
  const { enabled = true, debounceMs } = options;
  const context = useSpellboundContext();
  const {
    config,
    checkSpelling,
    getSuggestions: contextGetSuggestions,
    addToUserDictionary,
    ignoreWord: contextIgnore,
  } = context;

  const delay = debounceMs ?? config.debounceMs ?? 300;
  const debouncedText = useDebounce(text, delay);

  const [errors, setErrors] = useState<SpellCheckResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const textRef = useRef(text);

  // Update ref to latest text
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Perform spell check when debounced text changes
  useEffect(() => {
    if (!enabled || !context.isReady) {
      setErrors([]);
      return;
    }

    setIsChecking(true);

    // Use requestIdleCallback if available for better performance
    const check = () => {
      const results = checkSpelling(debouncedText);
      setErrors(results);
      setIsChecking(false);
    };

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(check, { timeout: 100 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const id = setTimeout(check, 0);
      return () => clearTimeout(id);
    }
  }, [debouncedText, enabled, context.isReady, checkSpelling]);

  const getSuggestions = useCallback(
    (word: string, limit = 5) => {
      return contextGetSuggestions(word, limit);
    },
    [contextGetSuggestions]
  );

  const addToDictionary = useCallback(
    (word: string) => {
      addToUserDictionary(word);
      // Re-check to update errors
      setErrors((prev) => prev.filter((e) => e.word.toLowerCase() !== word.toLowerCase()));
    },
    [addToUserDictionary]
  );

  const ignoreWord = useCallback(
    (word: string) => {
      contextIgnore(word);
      setErrors((prev) => prev.filter((e) => e.word.toLowerCase() !== word.toLowerCase()));
    },
    [contextIgnore]
  );

  const recheck = useCallback(() => {
    if (enabled && context.isReady) {
      const results = checkSpelling(textRef.current);
      setErrors(results);
    }
  }, [enabled, context.isReady, checkSpelling]);

  return {
    errors,
    isChecking,
    getSuggestions,
    addToDictionary,
    ignoreWord,
    recheck,
  };
}

/**
 * Hook for grammar checking text
 *
 * @example
 * ```tsx
 * function Editor() {
 *   const [text, setText] = useState('');
 *   const { issues, isChecking } = useGrammarCheck(text);
 *
 *   return (
 *     <div>
 *       <textarea value={text} onChange={e => setText(e.target.value)} />
 *       {issues.map(issue => (
 *         <div key={`${issue.range.start}-${issue.range.end}`}>
 *           {issue.message} - {issue.suggestions.join(', ')}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useGrammarCheck(
  text: string,
  options: UseGrammarCheckOptions = {}
): UseGrammarCheckResult {
  const { enabled = true, debounceMs } = options;
  const context = useSpellboundContext();
  const { config, checkGrammar } = context;

  const delay = debounceMs ?? config.debounceMs ?? 300;
  const debouncedText = useDebounce(text, delay);

  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const textRef = useRef(text);

  // Update ref to latest text
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Perform grammar check when debounced text changes
  useEffect(() => {
    if (!enabled || !context.isReady) {
      setIssues([]);
      return;
    }

    setIsChecking(true);

    const check = () => {
      const results = checkGrammar(debouncedText);
      setIssues(results);
      setIsChecking(false);
    };

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(check, { timeout: 100 });
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const id = setTimeout(check, 0);
      return () => clearTimeout(id);
    }
  }, [debouncedText, enabled, context.isReady, checkGrammar]);

  const recheck = useCallback(() => {
    if (enabled && context.isReady) {
      const results = checkGrammar(textRef.current);
      setIssues(results);
    }
  }, [enabled, context.isReady, checkGrammar]);

  return {
    issues,
    isChecking,
    recheck,
  };
}

/**
 * Combined hook for both spell and grammar checking
 *
 * @example
 * ```tsx
 * function Editor() {
 *   const [text, setText] = useState('');
 *   const { spellingErrors, grammarIssues, isChecking } = useProofreading(text);
 *
 *   return (
 *     <div>
 *       <textarea value={text} onChange={e => setText(e.target.value)} />
 *       <HighlightedText
 *         text={text}
 *         spellingErrors={spellingErrors}
 *         grammarIssues={grammarIssues}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function useProofreading(
  text: string,
  options: {
    spellcheck?: UseSpellcheckOptions;
    grammar?: UseGrammarCheckOptions;
  } = {}
) {
  const spellResult = useSpellcheck(text, options.spellcheck);
  const grammarResult = useGrammarCheck(text, options.grammar);

  return {
    spellingErrors: spellResult.errors,
    grammarIssues: grammarResult.issues,
    isChecking: spellResult.isChecking || grammarResult.isChecking,
    getSuggestions: spellResult.getSuggestions,
    addToDictionary: spellResult.addToDictionary,
    ignoreWord: spellResult.ignoreWord,
    recheckSpelling: spellResult.recheck,
    recheckGrammar: grammarResult.recheck,
    recheckAll: () => {
      spellResult.recheck();
      grammarResult.recheck();
    },
  };
}
