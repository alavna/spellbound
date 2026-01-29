import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one foot, two feet
 * 
 * Source: LanguageTool (FOOT_FEET)
 * Category: grammar
 */
export const footFeetRule: GrammarRule = {
  id: 'foot-feet',
  name: 'one foot, two feet',
  description: '\'foot\' is the singular form of \'feet\'. Consider using foot.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|one\b\s+\bfeet\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'foot\' is the singular form of \'feet\'. Consider using foot.',
        suggestions: ["foot"],
      });
    }
    
    return issues;
  },
};
