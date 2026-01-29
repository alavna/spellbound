import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * t he (the)
 * 
 * Source: LanguageTool (T_HE)
 * Category: grammar
 */
export const tHeRule: GrammarRule = {
  id: 't-he',
  name: 't he (the)',
  description: 'Did you mean the?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bt\b\s+\bhe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the?',
        suggestions: ["the"],
      });
    }
    
    return issues;
  },
};
