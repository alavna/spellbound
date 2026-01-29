import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * used to could (be able to)
 * 
 * Source: LanguageTool (USED_TO_COULD)
 * Category: style
 */
export const usedToCouldRule: GrammarRule = {
  id: 'used-to-could',
  name: 'used to could (be able to)',
  description: 'Did you mean be able to?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bused\b\s+\bto\b\s+\bcould\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean be able to?',
        suggestions: ["be able to"],
      });
    }
    
    return issues;
  },
};
