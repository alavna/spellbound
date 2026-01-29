import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Materiel (matériel or material)
 * 
 * Source: LanguageTool (MATERIEL)
 * Category: grammar
 */
export const materielRule: GrammarRule = {
  id: 'materiel',
  name: 'Materiel (matériel or material)',
  description: 'Did you mean (= substance) or (= military equipment)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmateriels?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (= substance) or (= military equipment)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
