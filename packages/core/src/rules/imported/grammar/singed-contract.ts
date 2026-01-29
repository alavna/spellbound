import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * confusion singed/signed
 * 
 * Source: LanguageTool (SINGED_CONTRACT)
 * Category: grammar
 */
export const singedContractRule: GrammarRule = {
  id: 'singed-contract',
  name: 'confusion singed/signed',
  description: 'Are you sure you meant to write \'singed\' (a synonym for \'burnt\'), or did you mean \'signed\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsinged\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Are you sure you meant to write \'singed\' (a synonym for \'burnt\'), or did you mean \'signed\'?',
        suggestions: ["signed"],
      });
    }
    
    return issues;
  },
};
