import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Katharina (Katherina) Reiche
 * 
 * Source: LanguageTool (KATHERINA_REICHE)
 * Category: grammar
 */
export const katherinaReicheRule: GrammarRule = {
  id: 'katherina-reiche',
  name: 'Katharina (Katherina) Reiche',
  description: 'The name of this German politician is written with an \"e\" in the middle.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bKath?arina\b\s+\bReiche\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this German politician is written with an \"e\" in the middle.',
        suggestions: ["Katherina \\2"],
      });
    }
    
    return issues;
  },
};
