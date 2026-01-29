import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it is ... to doing (do)
 * 
 * Source: LanguageTool (IT_IS_JJ_TO_VBG)
 * Category: grammar
 */
export const itIsJjToVbgRule: GrammarRule = {
  id: 'it-is-jj-to-vbg',
  name: 'it is ... to doing (do)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit\b\s+\bbe\b\s+\bnot\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
