import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the process of
 * 
 * Source: LanguageTool (IN_THE_PROCESS_OF)
 * Category: style
 */
export const inTheProcessOfRule: GrammarRule = {
  id: 'in-the-process-of',
  name: 'in the process of',
  description: 'Possibly empty phrase \"\\1 \\2 \\3 \\4\" when it means \"currently\".',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bprocess\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possibly empty phrase \"\\1 \\2 \\3 \\4\" when it means \"currently\".',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
