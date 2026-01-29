import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * subject matter (subject)
 * 
 * Source: LanguageTool (SUBJECT_MATTER)
 * Category: style
 */
export const subjectMatterRule: GrammarRule = {
  id: 'subject-matter',
  name: 'subject matter (subject)',
  description: 'This phrase is redundant. Consider using \\1 to avoid wordiness.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsubject\b\s+\bmatter\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using \\1 to avoid wordiness.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
