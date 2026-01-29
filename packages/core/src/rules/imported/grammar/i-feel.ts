import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I feel good
 * 
 * Source: LanguageTool (I_FEEL)
 * Category: grammar
 */
export const iFeelRule: GrammarRule = {
  id: 'i-feel',
  name: 'I feel good',
  description: 'This phrase is redundant. Consider using .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfeel\b\s+\bmyself\b\s+\bgood|fine|bad\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
