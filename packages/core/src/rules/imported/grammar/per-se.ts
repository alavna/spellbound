import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * per say (per se)
 * 
 * Source: LanguageTool (PER_SE)
 * Category: grammar
 */
export const perSeRule: GrammarRule = {
  id: 'per-se',
  name: 'per say (per se)',
  description: 'Did you mean per se (=by itself, by themselves)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bper\b\s+\bsay\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean per se (=by itself, by themselves)?',
        suggestions: ["per se"],
      });
    }
    
    return issues;
  },
};
