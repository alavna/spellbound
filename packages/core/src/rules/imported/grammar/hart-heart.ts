import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * confusion of hart/heart
 * 
 * Source: LanguageTool (HART_HEART)
 * Category: grammar
 */
export const hartHeartRule: GrammarRule = {
  id: 'hart-heart',
  name: 'confusion of hart/heart',
  description: 'Did you mean heart (=muscular organ)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bh(art|eard?|eat)\s+\bdiseases?|attacks?|failures?|surger(y|ies)|problems?|conditions?|transplants?|muscles?|beats?|valves?|rhythms?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean heart (=muscular organ)?',
        suggestions: ["heart"],
      });
    }
    
    return issues;
  },
};
