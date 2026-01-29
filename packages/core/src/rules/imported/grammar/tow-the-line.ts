import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tow (toe) the line
 * 
 * Source: LanguageTool (TOW_THE_LINE)
 * Category: grammar
 */
export const towTheLineRule: GrammarRule = {
  id: 'tow-the-line',
  name: 'tow (toe) the line',
  description: 'Did you mean toe?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bthe\b\s+\bline\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean toe?',
        suggestions: ["toe"],
      });
    }
    
    return issues;
  },
};
