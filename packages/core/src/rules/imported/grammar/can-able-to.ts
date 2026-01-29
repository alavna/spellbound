import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * can able to (can)
 * 
 * Source: LanguageTool (CAN_ABLE_TO)
 * Category: grammar
 */
export const canAbleToRule: GrammarRule = {
  id: 'can-able-to',
  name: 'can able to (can)',
  description: 'One of these words may be redundant.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan\b\s+\bable\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'One of these words may be redundant.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
