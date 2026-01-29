import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I saw it and I (0) should have said something to you
 * 
 * Source: LanguageTool (SUBJECT_DROP)
 * Category: style
 */
export const subjectDropRule: GrammarRule = {
  id: 'subject-drop',
  name: 'I saw it and I (0) should have said something to you',
  description: 'Reusing \'\\2\' could be redundant. Try omitting the pronoun.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\band\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Reusing \'\\2\' could be redundant. Try omitting the pronoun.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
