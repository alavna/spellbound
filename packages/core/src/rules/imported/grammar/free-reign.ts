import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * free reign (rein)
 * 
 * Source: LanguageTool (FREE_REIGN)
 * Category: grammar
 */
export const freeReignRule: GrammarRule = {
  id: 'free-reign',
  name: 'free reign (rein)',
  description: 'Did you mean free rein?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfree\b\s+\breign\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean free rein?',
        suggestions: ["free rein"],
      });
    }
    
    return issues;
  },
};
