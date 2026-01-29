import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'merchandize' vs. 'merchandise'
 * 
 * Source: LanguageTool (MERCHANDIZE)
 * Category: style
 */
export const merchandizeRule: GrammarRule = {
  id: 'merchandize',
  name: '\'merchandize\' vs. \'merchandise\'',
  description: 'Consider using the more commonly used .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the more commonly used .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
