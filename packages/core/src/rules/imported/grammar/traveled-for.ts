import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * travel (for) X days
 * 
 * Source: LanguageTool (TRAVELED_FOR)
 * Category: grammar
 */
export const traveledForRule: GrammarRule = {
  id: 'traveled-for',
  name: 'travel (for) X days',
  description: 'The word \"for\" is missing between \"\\2\" and \"\\3\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\btravell?ed\b\s+\S+\s+(?:hour|day|week|month|year|session|semester|term|course)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"for\" is missing between \"\\2\" and \"\\3\".',
        suggestions: ["\\1 traveled for \\3 \\4"],
      });
    }
    
    return issues;
  },
};
