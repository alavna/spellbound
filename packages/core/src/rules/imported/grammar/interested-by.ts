import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: interested by/in
 * 
 * Source: LanguageTool (INTERESTED_BY)
 * Category: grammar
 */
export const interestedByRule: GrammarRule = {
  id: 'interested-by',
  name: 'Collocation: interested by/in',
  description: 'The usual collocation for \"\\1\" is \"in\", not \"by\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\binterest(?:ed)?\s+\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\1\" is \"in\", not \"by\".',
        suggestions: ["\\1 in"],
      });
    }
    
    return issues;
  },
};
