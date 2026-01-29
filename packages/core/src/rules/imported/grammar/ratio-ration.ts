import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ration or ratio
 * 
 * Source: LanguageTool (RATIO_RATION)
 * Category: grammar
 */
export const ratioRationRule: GrammarRule = {
  id: 'ratio-ration',
  name: 'ration or ratio',
  description: 'Did you mean ratio?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baspect|compression\b\s+\bration\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ratio?',
        suggestions: ["ratio"],
      });
    }
    
    return issues;
  },
};
