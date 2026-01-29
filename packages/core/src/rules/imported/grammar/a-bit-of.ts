import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a bit (of)
 * 
 * Source: LanguageTool (A_BIT_OF)
 * Category: grammar
 */
export const aBitOfRule: GrammarRule = {
  id: 'a-bit-of',
  name: 'a bit (of)',
  description: 'It seems that there\'s a missing preposition after \'\\3\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\bbunch|lot|pair|majority|bit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that there\'s a missing preposition after \'\\3\'.',
        suggestions: ["\\3 of"],
      });
    }
    
    return issues;
  },
};
