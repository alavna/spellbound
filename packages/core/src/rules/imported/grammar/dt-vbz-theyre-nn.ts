import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * DT VBZ they're (their) NN
 * 
 * Source: LanguageTool (DT_VBZ_THEYRE_NN)
 * Category: grammar
 */
export const dtVbzTheyreNnRule: GrammarRule = {
  id: 'dt-vbz-theyre-nn',
  name: 'DT VBZ they\'re (their) NN',
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
