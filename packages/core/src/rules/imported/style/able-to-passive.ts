import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to be able to + 'passive voice'
 * 
 * Source: LanguageTool (ABLE_TO_PASSIVE)
 * Category: style
 */
export const ableToPassiveRule: GrammarRule = {
  id: 'able-to-passive',
  name: 'to be able to + \'passive voice\'',
  description: 'Avoid the passive voice after \'to be able to\'.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bable\b\s+\bto\b\s+\bbe\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid the passive voice after \'to be able to\'.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
