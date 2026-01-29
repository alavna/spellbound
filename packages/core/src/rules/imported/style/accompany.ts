import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accompany
 * 
 * Source: LanguageTool (ACCOMPANY)
 * Category: style
 */
export const accompanyRule: GrammarRule = {
  id: 'accompany',
  name: 'accompany',
  description: 'If not in musical context, use go with or with.',
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
        message: 'If not in musical context, use go with or with.',
        suggestions: ["go with","with"],
      });
    }
    
    return issues;
  },
};
