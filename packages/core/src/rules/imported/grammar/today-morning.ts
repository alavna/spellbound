import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong phrase: 'today morning' (this morning)
 * 
 * Source: LanguageTool (TODAY_MORNING)
 * Category: grammar
 */
export const todayMorningRule: GrammarRule = {
  id: 'today-morning',
  name: 'Wrong phrase: \'today morning\' (this morning)',
  description: 'This is a non-standard collocation. Normally, this \\2 is used.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btoday\b\s+\bmorning|afternoon|evening\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is a non-standard collocation. Normally, this \\2 is used.',
        suggestions: ["this \\2"],
      });
    }
    
    return issues;
  },
};
