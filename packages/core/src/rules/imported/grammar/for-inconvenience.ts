import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for (the) inconvenience
 * 
 * Source: LanguageTool (FOR_INCONVENIENCE)
 * Category: grammar
 */
export const forInconvenienceRule: GrammarRule = {
  id: 'for-inconvenience',
  name: 'for (the) inconvenience',
  description: 'It appears that an article is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfor\b\s+\binconveniences?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing.',
        suggestions: ["the"],
      });
    }
    
    return issues;
  },
};
