import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * La Paz
 * 
 * Source: LanguageTool (LA_PAZ)
 * Category: grammar
 */
export const laPazRule: GrammarRule = {
  id: 'la-paz',
  name: 'La Paz',
  description: 'The city name La Paz needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bla\b\s+\bpaz\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The city name La Paz needs to be capitalized.',
        suggestions: ["La Paz"],
      });
    }
    
    return issues;
  },
};
