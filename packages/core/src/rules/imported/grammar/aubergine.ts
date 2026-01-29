import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * eggplant/aubergine
 * 
 * Source: LanguageTool (AUBERGINE)
 * Category: grammar
 */
export const aubergineRule: GrammarRule = {
  id: 'aubergine',
  name: 'eggplant/aubergine',
  description: 'This term is chiefly British English. Consider a replacement.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baubergines?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This term is chiefly British English. Consider a replacement.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
