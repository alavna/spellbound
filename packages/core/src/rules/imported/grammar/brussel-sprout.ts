import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * brussel (brussels) sprout
 * 
 * Source: LanguageTool (BRUSSEL_SPROUT)
 * Category: grammar
 */
export const brusselSproutRule: GrammarRule = {
  id: 'brussel-sprout',
  name: 'brussel (brussels) sprout',
  description: 'Did you mean brussels sprout?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbrussell?|brussells\b\s+\bsprout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean brussels sprout?',
        suggestions: ["brussels sprout"],
      });
    }
    
    return issues;
  },
};
