import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * right (rite) of passage
 * 
 * Source: LanguageTool (RIGHT_OF_PASSAGE)
 * Category: grammar
 */
export const rightOfPassageRule: GrammarRule = {
  id: 'right-of-passage',
  name: 'right (rite) of passage',
  description: 'Did you mean of passage?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brights?\s+\bof\b\s+\bpassage\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of passage?',
        suggestions: ["of passage"],
      });
    }
    
    return issues;
  },
};
