import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Singles(') Day
 * 
 * Source: LanguageTool (SINGLES_DAY)
 * Category: grammar
 */
export const singlesDayRule: GrammarRule = {
  id: 'singles-day',
  name: 'Singles(\') Day',
  description: 'Did you mean the holiday Singles\' Day (capitalized and spelled with a possessive apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsingles\b\s+\bday\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the holiday Singles\' Day (capitalized and spelled with a possessive apostrophe)?',
        suggestions: ["Singles' Day"],
      });
    }
    
    return issues;
  },
};
