import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * solicit for
 * 
 * Source: LanguageTool (SOLICIT_FOR)
 * Category: style
 */
export const solicitForRule: GrammarRule = {
  id: 'solicit-for',
  name: 'solicit for',
  description: 'Avoid. Use asking for.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid. Use asking for.',
        suggestions: ["asking for"],
      });
    }
    
    return issues;
  },
};
