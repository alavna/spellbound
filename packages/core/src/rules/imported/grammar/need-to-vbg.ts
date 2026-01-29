import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * need to VBG (VB)
 * 
 * Source: LanguageTool (NEED_TO_VBG)
 * Category: grammar
 */
export const needToVbgRule: GrammarRule = {
  id: 'need-to-vbg',
  name: 'need to VBG (VB)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bneed(s|ed)?|going|ha(ve|[sd])|ought\b\s+\bto\b/gi;
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
