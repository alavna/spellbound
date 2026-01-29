import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * corse vs course
 * 
 * Source: LanguageTool (CORSE_COURSE)
 * Category: grammar
 */
export const corseCourseRule: GrammarRule = {
  id: 'corse-course',
  name: 'corse vs course',
  description: 'Did you mean course?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boff?\s+\bcorse\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean course?',
        suggestions: ["course"],
      });
    }
    
    return issues;
  },
};
