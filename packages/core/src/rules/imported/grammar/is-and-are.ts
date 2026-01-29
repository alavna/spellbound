import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ...is a major cause of death and affect(s) approximately 795,000
 * 
 * Source: LanguageTool (IS_AND_ARE)
 * Category: grammar
 */
export const isAndAreRule: GrammarRule = {
  id: 'is-and-are',
  name: '...is a major cause of death and affect(s) approximately 795,000',
  description: 'Possible subject-verb agreement error.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\band\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible subject-verb agreement error.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
