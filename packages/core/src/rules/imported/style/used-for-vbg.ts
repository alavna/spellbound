import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * They were used to hunt (for hunting) partridges
 * 
 * Source: LanguageTool (USED_FOR_VBG)
 * Category: style
 */
export const usedForVbgRule: GrammarRule = {
  id: 'used-for-vbg',
  name: 'They were used to hunt (for hunting) partridges',
  description: 'Try using \'for\' + the -ing form of the verb.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bbred|used\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try using \'for\' + the -ing form of the verb.',
        suggestions: ["for"],
      });
    }
    
    return issues;
  },
};
