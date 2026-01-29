import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * worse come to worse (worst)
 * 
 * Source: LanguageTool (WORSE_WORST)
 * Category: grammar
 */
export const worseWorstRule: GrammarRule = {
  id: 'worse-worst',
  name: 'worse come to worse (worst)',
  description: 'Did you mean worst to indicate that something has degraded from one negative plane to the lowest possible?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworse\b\s+\byes\b\s+\bto\b\s+\bworse\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worst to indicate that something has degraded from one negative plane to the lowest possible?',
        suggestions: ["worst"],
      });
    }
    
    return issues;
  },
};
