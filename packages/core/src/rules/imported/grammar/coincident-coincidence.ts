import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * coincident vs coincidence
 * 
 * Source: LanguageTool (COINCIDENT_COINCIDENCE)
 * Category: grammar
 */
export const coincidentCoincidenceRule: GrammarRule = {
  id: 'coincident-coincidence',
  name: 'coincident vs coincidence',
  description: 'Did you mean the noun coincidence?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun coincidence?',
        suggestions: ["coincidence"],
      });
    }
    
    return issues;
  },
};
