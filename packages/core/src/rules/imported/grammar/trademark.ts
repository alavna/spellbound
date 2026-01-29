import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * (TM) instead of ™
 * 
 * Source: LanguageTool (TRADEMARK)
 * Category: grammar
 */
export const trademarkRule: GrammarRule = {
  id: 'trademark',
  name: '(TM) instead of ™',
  description: 'Would you like to use the symbol ™ instead?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\.\p\.Lu\.\.\.\s+\.\s+\bTM\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Would you like to use the symbol ™ instead?',
        suggestions: ["™"],
      });
    }
    
    return issues;
  },
};
