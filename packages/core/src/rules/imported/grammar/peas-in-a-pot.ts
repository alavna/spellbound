import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * two peas in a pot (pod)
 * 
 * Source: LanguageTool (PEAS_IN_A_POT)
 * Category: grammar
 */
export const peasInAPotRule: GrammarRule = {
  id: 'peas-in-a-pot',
  name: 'two peas in a pot (pod)',
  description: 'Did you mean \'pod\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btwo\b\s+\bpeas\b\s+\bin\b\s+\ba\b\s+\bpot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'pod\'?',
        suggestions: ["pod"],
      });
    }
    
    return issues;
  },
};
