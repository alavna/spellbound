import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * New Zeeland (Zealand)
 * 
 * Source: LanguageTool (NEW_ZEELAND)
 * Category: grammar
 */
export const newZeelandRule: GrammarRule = {
  id: 'new-zeeland',
  name: 'New Zeeland (Zealand)',
  description: 'Did you mean New Zealand?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnew\b\s+\bzeeland|sealand\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean New Zealand?',
        suggestions: ["New Zealand"],
      });
    }
    
    return issues;
  },
};
