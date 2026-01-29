import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Persona non grata
 * 
 * Source: LanguageTool (PERSONA_NON_GRATA)
 * Category: grammar
 */
export const personaNonGrataRule: GrammarRule = {
  id: 'persona-non-grata',
  name: 'Persona non grata',
  description: 'Did you mean persona non grata (= person who is not appreciated)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpersona?s?\s+\bnon?\s+\bgrat(a|er)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean persona non grata (= person who is not appreciated)?',
        suggestions: ["persona non grata"],
      });
    }
    
    return issues;
  },
};
