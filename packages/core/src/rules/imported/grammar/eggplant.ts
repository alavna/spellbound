import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * eggplant/aubergine
 * 
 * Source: LanguageTool (EGGPLANT)
 * Category: grammar
 */
export const eggplantRule: GrammarRule = {
  id: 'eggplant',
  name: 'eggplant/aubergine',
  description: 'This term is chiefly North American English. Consider a replacement.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beggplants?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This term is chiefly North American English. Consider a replacement.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
