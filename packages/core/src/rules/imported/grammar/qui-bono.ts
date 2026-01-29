import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * qui bono (cui bono)
 * 
 * Source: LanguageTool (QUI_BONO)
 * Category: grammar
 */
export const quiBonoRule: GrammarRule = {
  id: 'qui-bono',
  name: 'qui bono (cui bono)',
  description: 'Non-standard Latin. Did you mean cui bono (=to whose benefit)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bqui\b\s+\bbono\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Non-standard Latin. Did you mean cui bono (=to whose benefit)?',
        suggestions: ["cui bono"],
      });
    }
    
    return issues;
  },
};
