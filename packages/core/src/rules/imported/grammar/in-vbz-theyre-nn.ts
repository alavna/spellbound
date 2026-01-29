import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * IN VBZ they're (their) NN
 * 
 * Source: LanguageTool (IN_VBZ_THEYRE_NN)
 * Category: grammar
 */
export const inVbzTheyreNnRule: GrammarRule = {
  id: 'in-vbz-theyre-nn',
  name: 'IN VBZ they\'re (their) NN',
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
