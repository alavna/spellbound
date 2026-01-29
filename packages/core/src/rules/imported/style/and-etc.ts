import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * and (etc)
 * 
 * Source: LanguageTool (AND_ETC)
 * Category: style
 */
export const andEtcRule: GrammarRule = {
  id: 'and-etc',
  name: 'and (etc)',
  description: 'Write the name of the item after \'\\1\' or use only \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\band\b\s+\betc\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Write the name of the item after \'\\1\' or use only \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
