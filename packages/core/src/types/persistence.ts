/**
 * Storage interface for persistence
 */
export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * Persistence options
 */
export interface PersistenceOptions {
  /** Whether persistence is enabled */
  enabled: boolean;
  /** Storage key prefix */
  keyPrefix: string;
  /** Storage implementation (defaults to localStorage) */
  storage?: Storage;
  /** Debounce time for saves in ms */
  debounceMs?: number;
}

/**
 * Data structure for persisted user dictionary
 */
export interface PersistedUserDictionary {
  version: 1;
  words: string[];
  updatedAt: string;
}

/**
 * Data structure for persisted rule settings
 */
export interface PersistedRuleSettings {
  version: 1;
  enabledRules: string[];
  disabledRules: string[];
  customRules: import('./grammar').PatternRule[];
  updatedAt: string;
}
