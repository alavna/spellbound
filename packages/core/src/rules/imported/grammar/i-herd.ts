import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I herd (heard)
 * 
 * Source: LanguageTool (I_HERD)
 * Category: grammar
 */
export const iHerdRule: GrammarRule = {
  id: 'i-herd',
  name: 'I herd (heard)',
  description: 'Did you mean heard (past tense of \'hear\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|it|we|they\b\s+\bherd\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean heard (past tense of \'hear\')?',
        suggestions: ["heard"],
      });
    }
    
    return issues;
  },
};
