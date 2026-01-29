import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * VBZ IN they're (their) NN
 * 
 * Source: LanguageTool (VBZ_IN_THEYRE_NN)
 * Category: grammar
 */
export const vbzInTheyreNnRule: GrammarRule = {
  id: 'vbz-in-theyre-nn',
  name: 'VBZ IN they\'re (their) NN',
  description: 'Did you mean their ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthey\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean their ?',
        suggestions: ["their"],
      });
    }
    
    return issues;
  },
};
