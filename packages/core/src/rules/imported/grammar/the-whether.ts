import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * How's the whether (weather)?
 * 
 * Source: LanguageTool (THE_WHETHER)
 * Category: grammar
 */
export const theWhetherRule: GrammarRule = {
  id: 'the-whether',
  name: 'How\'s the whether (weather)?',
  description: 'Possible error detected.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bwhether\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible error detected.',
        suggestions: ["whether","the weather"],
      });
    }
    
    return issues;
  },
};
