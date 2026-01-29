import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * prefer to [gerund] → [base form]
 * 
 * Source: LanguageTool (PREFER_TO_VBG)
 * Category: grammar
 */
export const preferToVbgRule: GrammarRule = {
  id: 'prefer-to-vbg',
  name: 'prefer to [gerund] → [base form]',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bprefer\b\s+\bto\b/gi;
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
