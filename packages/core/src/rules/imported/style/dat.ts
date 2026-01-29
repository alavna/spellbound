import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dat (that)
 * 
 * Source: LanguageTool (DAT)
 * Category: style
 */
export const datRule: GrammarRule = {
  id: 'dat',
  name: 'dat (that)',
  description: 'Did you mean that or date?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+[Dd]at\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean that or date?',
        suggestions: ["that","date"],
      });
    }
    
    return issues;
  },
};
