import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not unlike (similar, alike)
 * 
 * Source: LanguageTool (NOT_UNLIKE)
 * Category: style
 */
export const notUnlikeRule: GrammarRule = {
  id: 'not-unlike',
  name: 'not unlike (similar, alike)',
  description: 'Avoid using \"not\". Did you mean similar or alike?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\bunlike\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean similar or alike?',
        suggestions: ["similar","alike"],
      });
    }
    
    return issues;
  },
};
