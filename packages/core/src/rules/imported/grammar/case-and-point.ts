import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * case and (in) point
 * 
 * Source: LanguageTool (CASE_AND_POINT)
 * Category: grammar
 */
export const caseAndPointRule: GrammarRule = {
  id: 'case-and-point',
  name: 'case and (in) point',
  description: 'Did you mean \'case in point\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcase\b\s+\band\b\s+\bpoint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'case in point\'?',
        suggestions: ["case in point"],
      });
    }
    
    return issues;
  },
};
