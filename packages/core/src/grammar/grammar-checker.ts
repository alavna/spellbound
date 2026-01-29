import type {
  GrammarRule,
  GrammarIssue,
  GrammarCheckResult,
  GrammarCheckerOptions,
  RuleContext,
  CreateIssueParams,
  Sentence,
  ContentType,
} from '../types';
import { RuleRegistry, createRuleRegistry } from './rule-registry';
import { Tokenizer, createTokenizer } from '../dictionary/tokenizer';
import { builtInRules } from '../rules';

/**
 * GrammarChecker - Main grammar checking class
 *
 * Features:
 * - Check text for grammar issues
 * - Support for TypeScript and JSON pattern rules
 * - Extensible rule system
 * - Intelligent tokenization
 */
export class GrammarChecker {
  private registry: RuleRegistry;
  private tokenizer: Tokenizer;
  private contentType: ContentType;

  constructor(options: GrammarCheckerOptions = {}) {
    this.contentType = options.contentType ?? 'plain';
    this.tokenizer = createTokenizer(this.contentType);

    // Initialize rule registry
    this.registry = createRuleRegistry({
      persist: options.persist,
      storageKey: options.storageKey,
    });

    // Register built-in rules if no custom rules provided
    if (!options.rules) {
      this.registry.registerAll(builtInRules);
    } else {
      this.registry.registerAll(options.rules);
    }

    // Apply enable/disable overrides
    if (options.enableRules) {
      for (const ruleId of options.enableRules) {
        this.registry.enable(ruleId);
      }
    }

    if (options.disableRules) {
      for (const ruleId of options.disableRules) {
        this.registry.disable(ruleId);
      }
    }
  }

  /**
   * Check text for grammar issues
   */
  check(text: string): GrammarCheckResult {
    const tokens = this.tokenizer.tokenize(text);
    const sentences = this.tokenizer.extractSentences(text);
    const enabledRules = this.registry.getEnabledRules();

    const allIssues: GrammarIssue[] = [];

    for (const rule of enabledRules) {
      const context = this.createContext(text, tokens, sentences, rule);

      try {
        const issues = rule.check(context);
        allIssues.push(...issues);
      } catch (error) {
        // Log error but continue with other rules
        console.error(`Error in rule ${rule.id}:`, error);
      }
    }

    // Sort issues by position
    allIssues.sort((a, b) => a.start - b.start);

    // Remove overlapping issues (keep first/higher priority)
    const filteredIssues = this.removeOverlapping(allIssues);

    return {
      text,
      issues: filteredIssues,
    };
  }

  /**
   * Create a rule context for execution
   */
  private createContext(
    text: string,
    tokens: ReturnType<Tokenizer['tokenize']>,
    sentences: Sentence[],
    rule: GrammarRule
  ): RuleContext {
    return {
      text,
      tokens,
      sentences,
      createIssue: (params: CreateIssueParams): GrammarIssue => ({
        ruleId: rule.id,
        message: params.message,
        severity: rule.severity,
        start: params.start,
        end: params.end,
        match: params.match,
        replacements: params.replacements || [],
        category: rule.category,
      }),
    };
  }

  /**
   * Remove overlapping issues (keep the first one)
   */
  private removeOverlapping(issues: GrammarIssue[]): GrammarIssue[] {
    if (issues.length <= 1) {
      return issues;
    }

    const result: GrammarIssue[] = [issues[0]];

    for (let i = 1; i < issues.length; i++) {
      const current = issues[i];
      const last = result[result.length - 1];

      // Check for overlap
      if (current.start >= last.end) {
        result.push(current);
      }
      // If overlapping, keep the one with higher severity
      else if (this.getSeverityWeight(current.severity) > this.getSeverityWeight(last.severity)) {
        result[result.length - 1] = current;
      }
    }

    return result;
  }

  /**
   * Get severity weight for prioritization
   */
  private getSeverityWeight(severity: GrammarIssue['severity']): number {
    switch (severity) {
      case 'error':
        return 3;
      case 'warning':
        return 2;
      case 'info':
        return 1;
      default:
        return 0;
    }
  }

  /**
   * Get the rule registry for customization
   */
  getRegistry(): RuleRegistry {
    return this.registry;
  }

  /**
   * Register a new rule
   */
  registerRule(rule: GrammarRule): void {
    this.registry.register(rule);
  }

  /**
   * Register a pattern-based rule
   */
  registerPatternRule(pattern: Parameters<RuleRegistry['registerPattern']>[0]): void {
    this.registry.registerPattern(pattern);
  }

  /**
   * Unregister a rule
   */
  unregisterRule(ruleId: string): void {
    this.registry.unregister(ruleId);
  }

  /**
   * Enable a rule
   */
  enableRule(ruleId: string): void {
    this.registry.enable(ruleId);
  }

  /**
   * Disable a rule
   */
  disableRule(ruleId: string): void {
    this.registry.disable(ruleId);
  }

  /**
   * Check if a rule is enabled
   */
  isRuleEnabled(ruleId: string): boolean {
    return this.registry.isEnabled(ruleId);
  }

  /**
   * Get all rules
   */
  getAllRules(): GrammarRule[] {
    return this.registry.getAllRules();
  }

  /**
   * Get enabled rules
   */
  getEnabledRules(): GrammarRule[] {
    return this.registry.getEnabledRules();
  }

  /**
   * Set content type
   */
  setContentType(contentType: ContentType): void {
    this.contentType = contentType;
    this.tokenizer.setContentType(contentType);
  }
}

/**
 * Create a grammar checker instance
 */
export function createGrammarChecker(options: GrammarCheckerOptions = {}): GrammarChecker {
  return new GrammarChecker(options);
}
