import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He is to making (is making)
 * 
 * Source: LanguageTool (BE_TO_VBG)
 * Category: grammar
 */
export const beToVbgRule: GrammarRule = {
  id: 'be-to-vbg',
  name: 'He is to making (is making)',
  description: 'The word \'to\' seems to be wrong here. \"\\3\" is a present participle verb.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwas|is|'s|am|'m|are|'re|were|been\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'to\' seems to be wrong here. \"\\3\" is a present participle verb.',
        suggestions: ["\\3"],
      });
    }
    
    return issues;
  },
};
