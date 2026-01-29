import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * self-admitted (admitted)
 * 
 * Source: LanguageTool (SELF_ADMITTED)
 * Category: style
 */
export const selfAdmittedRule: GrammarRule = {
  id: 'self-admitted',
  name: 'self-admitted (admitted)',
  description: 'This phrase is redundant. Consider using just admitted.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bself-admitted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using just admitted.',
        suggestions: ["admitted"],
      });
    }
    
    return issues;
  },
};
