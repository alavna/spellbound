import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * check box (checkbox)
 * 
 * Source: LanguageTool (CHECK_BOX_COMPOUND)
 * Category: grammar
 */
export const checkBoxCompoundRule: GrammarRule = {
  id: 'check-box-compound',
  name: 'check box (checkbox)',
  description: 'The noun check is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|y?our|their|its|his\b\s+\bcheck\b\s+\bbox(es)?|lists?|mates?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun check is spelled as one word.',
        suggestions: ["check"],
      });
    }
    
    return issues;
  },
};
