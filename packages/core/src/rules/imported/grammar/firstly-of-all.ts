import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * firstly (first) of all
 * 
 * Source: LanguageTool (FIRSTLY_OF_ALL)
 * Category: grammar
 */
export const firstlyOfAllRule: GrammarRule = {
  id: 'firstly-of-all',
  name: 'firstly (first) of all',
  description: 'The correct introductory phrase is either \\3 \\4 or just \\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bfirstly|lastly\b\s+\bof\b\s+\ball\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct introductory phrase is either \\3 \\4 or just \\2.',
        suggestions: ["\\3 \\4","\\2"],
      });
    }
    
    return issues;
  },
};
