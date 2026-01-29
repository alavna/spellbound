import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * some faculty... (some faculty members...)
 * 
 * Source: LanguageTool (SOME_FACULTY)
 * Category: grammar
 */
export const someFacultyRule: GrammarRule = {
  id: 'some-faculty',
  name: 'some faculty... (some faculty members...)',
  description: 'Use a plural noun after \'\' or use members.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome|many|most|two|three|four|five|six|seven|eight|nine|ten\b\s+\bfaculty|committee|staff\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use a plural noun after \'\' or use members.',
        suggestions: ["members"],
      });
    }
    
    return issues;
  },
};
