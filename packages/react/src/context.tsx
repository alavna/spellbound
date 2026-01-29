import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  SpellChecker,
  GrammarChecker,
  DictionaryManager,
  createSpellChecker,
  createGrammarChecker,
  createDictionaryManager,
} from '@spellbound/core';
import type { SpellCheckResult, GrammarIssue } from '@spellbound/core';
import type { SpellboundConfig, SpellboundContextValue } from './types';

const SpellboundContext = createContext<SpellboundContextValue | null>(null);

/**
 * Hook to access the Spellbound context
 * @throws Error if used outside of SpellboundProvider
 */
export function useSpellboundContext(): SpellboundContextValue {
  const context = useContext(SpellboundContext);
  if (!context) {
    throw new Error('useSpellboundContext must be used within a SpellboundProvider');
  }
  return context;
}

/**
 * Hook to safely access Spellbound context (returns null if not available)
 */
export function useSpellboundContextSafe(): SpellboundContextValue | null {
  return useContext(SpellboundContext);
}

export interface SpellboundProviderProps {
  children: React.ReactNode;
  config?: SpellboundConfig;
}

const DEFAULT_CONFIG: SpellboundConfig = {
  debounceMs: 300,
  enableSpellCheck: true,
  enableGrammarCheck: true,
  persistUserDictionary: false,
  userDictionaryKey: 'spellbound-user-dictionary',
};

/**
 * Provider component that initializes and provides Spellbound context
 */
export function SpellboundProvider({ children, config: userConfig }: SpellboundProviderProps) {
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...userConfig }), [userConfig]);

  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [ignoredWords, setIgnoredWords] = useState<Set<string>>(new Set());

  // Refs to hold instances
  const dictionaryManagerRef = useRef<DictionaryManager | null>(null);
  const spellCheckerRef = useRef<SpellChecker | null>(null);
  const grammarCheckerRef = useRef<GrammarChecker | null>(null);

  // Initialize instances
  useEffect(() => {
    const initializeInstances = async () => {
      try {
        // Use provided instances or create new ones
        const dictManager =
          config.dictionaryManager ||
          createDictionaryManager({
            persist: config.persistUserDictionary,
            storageKey: config.userDictionaryKey,
          });
        dictionaryManagerRef.current = dictManager as DictionaryManager;

        const spellCheck =
          config.spellChecker ||
          createSpellChecker({
            dictionaryManager: dictManager,
            ...config.spellCheckerOptions,
          });
        spellCheckerRef.current = spellCheck as SpellChecker;

        const grammarCheck =
          config.grammarChecker || createGrammarChecker(config.grammarCheckerOptions);
        grammarCheckerRef.current = grammarCheck as GrammarChecker;

        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize Spellbound:', error);
      }
    };

    initializeInstances();

    return () => {
      // Cleanup if needed
      dictionaryManagerRef.current = null;
      spellCheckerRef.current = null;
      grammarCheckerRef.current = null;
    };
  }, [config]);

  const checkSpelling = useCallback(
    (text: string): SpellCheckResult[] => {
      if (!spellCheckerRef.current || !config.enableSpellCheck) {
        return [];
      }

      setIsChecking(true);
      try {
        const results = spellCheckerRef.current.check(text);
        // Filter out ignored words
        return results.filter((result) => !ignoredWords.has(result.word.toLowerCase()));
      } finally {
        setIsChecking(false);
      }
    },
    [config.enableSpellCheck, ignoredWords]
  );

  const checkGrammar = useCallback(
    (text: string): GrammarIssue[] => {
      if (!grammarCheckerRef.current || !config.enableGrammarCheck) {
        return [];
      }

      setIsChecking(true);
      try {
        const result = grammarCheckerRef.current.check(text);
        return result.issues;
      } finally {
        setIsChecking(false);
      }
    },
    [config.enableGrammarCheck]
  );

  const addToUserDictionary = useCallback((word: string) => {
    if (dictionaryManagerRef.current) {
      dictionaryManagerRef.current.addWord(word);
    }
  }, []);

  const removeFromUserDictionary = useCallback((word: string) => {
    if (dictionaryManagerRef.current) {
      dictionaryManagerRef.current.removeWord(word);
    }
  }, []);

  const ignoreWord = useCallback((word: string) => {
    setIgnoredWords((prev) => new Set(prev).add(word.toLowerCase()));
  }, []);

  const getSuggestions = useCallback((word: string, limit = 5): string[] => {
    if (!spellCheckerRef.current) {
      return [];
    }
    return spellCheckerRef.current.getSuggestions(word).slice(0, limit);
  }, []);

  const contextValue: SpellboundContextValue = useMemo(
    () => ({
      spellChecker: spellCheckerRef.current,
      grammarChecker: grammarCheckerRef.current,
      dictionaryManager: dictionaryManagerRef.current,
      isReady,
      isChecking,
      checkSpelling,
      checkGrammar,
      addToUserDictionary,
      removeFromUserDictionary,
      ignoreWord,
      getSuggestions,
      config,
    }),
    [
      isReady,
      isChecking,
      checkSpelling,
      checkGrammar,
      addToUserDictionary,
      removeFromUserDictionary,
      ignoreWord,
      getSuggestions,
      config,
    ]
  );

  return <SpellboundContext.Provider value={contextValue}>{children}</SpellboundContext.Provider>;
}

export { SpellboundContext };
