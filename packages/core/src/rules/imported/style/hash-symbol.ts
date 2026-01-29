import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Replace '#'
 * 
 * Source: LanguageTool (HASH_SYMBOL)
 * Category: style
 */
export const hashSymbolRule: GrammarRule = {
  id: 'hash-symbol',
  name: 'Replace \'#\'',
  description: 'Wikipedia style. Replace \"#\" with No. or number when referring to numbers or rankings.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /#/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Wikipedia style. Replace \"#\" with No. or number when referring to numbers or rankings.',
        suggestions: ["No.","number"],
      });
    }
    
    return issues;
  },
};
