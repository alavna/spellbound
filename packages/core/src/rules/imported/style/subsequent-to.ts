import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * subsequent to (after)
 * 
 * Source: LanguageTool (SUBSEQUENT_TO)
 * Category: style
 */
export const subsequentToRule: GrammarRule = {
  id: 'subsequent-to',
  name: 'subsequent to (after)',
  description: 'Consider using after',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsubsequent\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using after',
        suggestions: ["after"],
      });
    }
    
    return issues;
  },
};
