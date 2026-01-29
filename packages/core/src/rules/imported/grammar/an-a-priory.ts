import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a priory (a priori)
 * 
 * Source: LanguageTool (AN_A_PRIORY)
 * Category: grammar
 */
export const anAPrioryRule: GrammarRule = {
  id: 'an-a-priory',
  name: 'a priory (a priori)',
  description: 'Did you mean the Latin term a priori?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the\b\s+\ba\b\s+\bpriory\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Latin term a priori?',
        suggestions: ["a priori"],
      });
    }
    
    return issues;
  },
};
