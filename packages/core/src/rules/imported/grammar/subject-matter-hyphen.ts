import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'subject matter expert'
 * 
 * Source: LanguageTool (SUBJECT_MATTER_HYPHEN)
 * Category: grammar
 */
export const subjectMatterHyphenRule: GrammarRule = {
  id: 'subject-matter-hyphen',
  name: 'missing hyphen in \'subject matter expert\'',
  description: 'This term is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsubject\b\s+\bmatter\b\s+\bexperts?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This term is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
