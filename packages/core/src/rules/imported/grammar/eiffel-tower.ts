import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Eifel (Eiffel)
 * 
 * Source: LanguageTool (EIFFEL_TOWER)
 * Category: grammar
 */
export const eiffelTowerRule: GrammarRule = {
  id: 'eiffel-tower',
  name: 'Eifel (Eiffel)',
  description: 'Did you mean the Eiffel Tower in Paris?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beifel\b\s+\btower\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Eiffel Tower in Paris?',
        suggestions: ["Eiffel Tower"],
      });
    }
    
    return issues;
  },
};
