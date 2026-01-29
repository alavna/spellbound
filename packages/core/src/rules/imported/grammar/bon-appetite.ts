import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bon appétit
 * 
 * Source: LanguageTool (BON_APPETITE)
 * Category: grammar
 */
export const bonAppetiteRule: GrammarRule = {
  id: 'bon-appetite',
  name: 'bon appétit',
  description: 'Did you mean the French phrase \\1 (= enjoy your meal)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbon\b\s+\bapp?.tite?s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the French phrase \\1 (= enjoy your meal)?',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
