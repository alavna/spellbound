import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * striped (stripped)
 * 
 * Source: LanguageTool (STRIPED_STRIPPED)
 * Category: grammar
 */
export const stripedStrippedRule: GrammarRule = {
  id: 'striped-stripped',
  name: 'striped (stripped)',
  description: 'Did you mean stripped (= without clothes / deprived of)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstriped\b\s+\bnaked|of\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean stripped (= without clothes / deprived of)?',
        suggestions: ["stripped"],
      });
    }
    
    return issues;
  },
};
