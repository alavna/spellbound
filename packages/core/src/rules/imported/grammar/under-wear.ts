import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * under wear (underwear)
 * 
 * Source: LanguageTool (UNDER_WEAR)
 * Category: grammar
 */
export const underWearRule: GrammarRule = {
  id: 'under-wear',
  name: 'under wear (underwear)',
  description: 'Did you mean underwear (=underclothes)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bunder\b\s+\bwear\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean underwear (=underclothes)?',
        suggestions: ["underwear"],
      });
    }
    
    return issues;
  },
};
