import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * May 20001 (May 2001)
 * 
 * Source: LanguageTool (YEAR_20001)
 * Category: grammar
 */
export const year20001Rule: GrammarRule = {
  id: 'year-20001',
  name: 'May 20001 (May 2001)',
  description: 'Did you really mean year \\2? Or maybe ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /&months;|year\b\s+200\d\d\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you really mean year \\2? Or maybe ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
