import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * likely hood (likelihood)
 * 
 * Source: LanguageTool (LIKELY_HOOD)
 * Category: grammar
 */
export const likelyHoodRule: GrammarRule = {
  id: 'likely-hood',
  name: 'likely hood (likelihood)',
  description: 'Did you mean the noun ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(un)?likel[iy]|livel[iy]\s+\bhoods?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
