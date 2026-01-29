import type {
  GrammarRule,
  PatternRule,
  IssueCategory,
  GrammarIssue,
  RuleContext,
} from '../types';

const DEFAULT_STORAGE_KEY = 'spellbound:rule-settings';

/**
 * RuleRegistry manages grammar rules registration and state.
 *
 * Features:
 * - Register/unregister rules dynamically
 * - Enable/disable rules
 * - Support for TypeScript and JSON pattern rules
 * - Persistence of rule settings
 */
export class RuleRegistry {
  private rules: Map<string, GrammarRule> = new Map();
  private enabledRules: Set<string> = new Set();
  private disabledRules: Set<string> = new Set();
  private customPatternRules: PatternRule[] = [];
  private persist: boolean;
  private storageKey: string;

  constructor(options: { persist?: boolean; storageKey?: string } = {}) {
    this.persist = options.persist ?? false;
    this.storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;

    if (this.persist) {
      this.loadPersistedSettings();
    }
  }

  /**
   * Register a TypeScript-based grammar rule
   */
  register(rule: GrammarRule): void {
    this.rules.set(rule.id, rule);

    if (rule.enabled) {
      this.enabledRules.add(rule.id);
    }
  }

  /**
   * Register multiple rules at once
   */
  registerAll(rules: GrammarRule[]): void {
    for (const rule of rules) {
      this.register(rule);
    }
  }

  /**
   * Register a JSON pattern-based rule
   */
  registerPattern(patternRule: PatternRule): void {
    const rule = this.convertPatternToRule(patternRule);
    this.register(rule);

    // Track custom pattern rules for persistence
    if (!this.customPatternRules.some((r) => r.id === patternRule.id)) {
      this.customPatternRules.push(patternRule);

      if (this.persist) {
        this.persistSettings();
      }
    }
  }

  /**
   * Register multiple pattern rules
   */
  registerPatterns(patterns: PatternRule[]): void {
    for (const pattern of patterns) {
      this.registerPattern(pattern);
    }
  }

  /**
   * Unregister a rule by ID
   */
  unregister(ruleId: string): boolean {
    const deleted = this.rules.delete(ruleId);
    this.enabledRules.delete(ruleId);
    this.disabledRules.delete(ruleId);

    // Remove from custom pattern rules
    const idx = this.customPatternRules.findIndex((r) => r.id === ruleId);
    if (idx >= 0) {
      this.customPatternRules.splice(idx, 1);
    }

    if (this.persist && deleted) {
      this.persistSettings();
    }

    return deleted;
  }

  /**
   * Get a rule by ID
   */
  get(ruleId: string): GrammarRule | undefined {
    return this.rules.get(ruleId);
  }

  /**
   * Check if a rule exists
   */
  has(ruleId: string): boolean {
    return this.rules.has(ruleId);
  }

  /**
   * Enable a rule
   */
  enable(ruleId: string): void {
    if (this.rules.has(ruleId)) {
      this.enabledRules.add(ruleId);
      this.disabledRules.delete(ruleId);

      if (this.persist) {
        this.persistSettings();
      }
    }
  }

  /**
   * Disable a rule
   */
  disable(ruleId: string): void {
    this.enabledRules.delete(ruleId);
    this.disabledRules.add(ruleId);

    if (this.persist) {
      this.persistSettings();
    }
  }

  /**
   * Check if a rule is enabled
   */
  isEnabled(ruleId: string): boolean {
    // Explicitly disabled
    if (this.disabledRules.has(ruleId)) {
      return false;
    }

    // Explicitly enabled
    if (this.enabledRules.has(ruleId)) {
      return true;
    }

    // Check rule's default state
    const rule = this.rules.get(ruleId);
    return rule?.enabled ?? false;
  }

  /**
   * Get all registered rules
   */
  getAllRules(): GrammarRule[] {
    return Array.from(this.rules.values());
  }

  /**
   * Get all enabled rules
   */
  getEnabledRules(): GrammarRule[] {
    return this.getAllRules().filter((rule) => this.isEnabled(rule.id));
  }

  /**
   * Get all disabled rules
   */
  getDisabledRules(): GrammarRule[] {
    return this.getAllRules().filter((rule) => !this.isEnabled(rule.id));
  }

  /**
   * Get rules by category
   */
  getRulesByCategory(category: IssueCategory): GrammarRule[] {
    return this.getAllRules().filter((rule) => rule.category === category);
  }

  /**
   * Get rule count
   */
  get size(): number {
    return this.rules.size;
  }

  /**
   * Clear all rules
   */
  clear(): void {
    this.rules.clear();
    this.enabledRules.clear();
    this.disabledRules.clear();
    this.customPatternRules = [];

    if (this.persist) {
      this.persistSettings();
    }
  }

  /**
   * Enable all rules
   */
  enableAll(): void {
    for (const rule of this.rules.values()) {
      this.enabledRules.add(rule.id);
    }
    this.disabledRules.clear();

    if (this.persist) {
      this.persistSettings();
    }
  }

  /**
   * Disable all rules
   */
  disableAll(): void {
    this.enabledRules.clear();
    for (const rule of this.rules.values()) {
      this.disabledRules.add(rule.id);
    }

    if (this.persist) {
      this.persistSettings();
    }
  }

  /**
   * Reset to default enabled/disabled states
   */
  resetToDefaults(): void {
    this.enabledRules.clear();
    this.disabledRules.clear();

    for (const rule of this.rules.values()) {
      if (rule.enabled) {
        this.enabledRules.add(rule.id);
      }
    }

    if (this.persist) {
      this.persistSettings();
    }
  }

  /**
   * Convert a JSON pattern rule to a TypeScript rule
   */
  private convertPatternToRule(pattern: PatternRule): GrammarRule {
    const regex = new RegExp(pattern.pattern, pattern.flags || 'gi');

    return {
      id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      severity: pattern.severity,
      category: pattern.category,
      enabled: pattern.enabled,
      check: (context: RuleContext): GrammarIssue[] => {
        const issues: GrammarIssue[] = [];
        let match: RegExpExecArray | null;

        // Reset lastIndex for global regex
        regex.lastIndex = 0;

        while ((match = regex.exec(context.text)) !== null) {
          // Process message template (replace $1, $2, etc.)
          let message = pattern.message;
          for (let i = 1; i < match.length; i++) {
            message = message.replace(new RegExp(`\\$${i}`, 'g'), match[i] || '');
          }

          // Process replacement templates
          const replacements = (pattern.replacements || []).map((repl) => {
            let result = repl;
            for (let i = 1; i < match!.length; i++) {
              result = result.replace(new RegExp(`\\$${i}`, 'g'), match![i] || '');
            }
            return result;
          });

          issues.push(
            context.createIssue({
              start: match.index,
              end: match.index + match[0].length,
              match: match[0],
              message,
              replacements,
            })
          );

          // Prevent infinite loop for zero-length matches
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }

        return issues;
      },
    };
  }

  /**
   * Load persisted settings from storage
   */
  private loadPersistedSettings(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === 1) {
          // Restore enabled/disabled rules
          if (Array.isArray(data.enabledRules)) {
            for (const id of data.enabledRules) {
              this.enabledRules.add(id);
            }
          }
          if (Array.isArray(data.disabledRules)) {
            for (const id of data.disabledRules) {
              this.disabledRules.add(id);
            }
          }
          // Restore custom pattern rules
          if (Array.isArray(data.customRules)) {
            for (const pattern of data.customRules) {
              this.registerPattern(pattern);
            }
          }
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Persist settings to storage
   */
  private persistSettings(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const data = {
        version: 1,
        enabledRules: Array.from(this.enabledRules),
        disabledRules: Array.from(this.disabledRules),
        customRules: this.customPatternRules,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch {
      // Ignore storage errors
    }
  }
}

/**
 * Create a rule registry instance
 */
export function createRuleRegistry(
  options: { persist?: boolean; storageKey?: string } = {}
): RuleRegistry {
  return new RuleRegistry(options);
}
