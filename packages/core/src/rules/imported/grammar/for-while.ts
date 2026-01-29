import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for (a) while
 * 
 * Source: LanguageTool (FOR_WHILE)
 * Category: grammar
 */
export const forWhileRule: GrammarRule = {
  id: 'for-while',
  name: 'for (a) while',
  description: 'It appears that an article is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bwhile|moment\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing.',
        suggestions: ["a \\2"],
      });
    }
    
    return issues;
  },
};
