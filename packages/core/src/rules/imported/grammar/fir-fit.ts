import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fir vs fit
 * 
 * Source: LanguageTool (FIR_FIT)
 * Category: grammar
 */
export const firFitRule: GrammarRule = {
  id: 'fir-fit',
  name: 'fir vs fit',
  description: 'Did you mean the verb fit?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bfir\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb fit?',
        suggestions: ["fit"],
      });
    }
    
    return issues;
  },
};
