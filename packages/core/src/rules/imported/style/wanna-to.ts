import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I don't wanna to travel (want to travel)
 * 
 * Source: LanguageTool (WANNA_TO)
 * Category: style
 */
export const wannaToRule: GrammarRule = {
  id: 'wanna-to',
  name: 'I don\'t wanna to travel (want to travel)',
  description: 'The word \'wanna\' is informal, consider replacing it.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwanna\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'wanna\' is informal, consider replacing it.',
        suggestions: ["want \\2 \\3"],
      });
    }
    
    return issues;
  },
};
