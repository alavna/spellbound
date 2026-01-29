import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ad nauseum (nauseam)
 * 
 * Source: LanguageTool (AD_NAUSEUM)
 * Category: grammar
 */
export const adNauseumRule: GrammarRule = {
  id: 'ad-nauseum',
  name: 'ad nauseum (nauseam)',
  description: 'Did you mean ad nauseam?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bad\b\s+\bnauseum\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ad nauseam?',
        suggestions: ["ad nauseam"],
      });
    }
    
    return issues;
  },
};
