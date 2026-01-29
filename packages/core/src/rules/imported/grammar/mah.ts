import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mah (my)
 * 
 * Source: LanguageTool (MAH)
 * Category: grammar
 */
export const mahRule: GrammarRule = {
  id: 'mah',
  name: 'mah (my)',
  description: '\"\\1\" is an abbreviation for \"mahogany\". Did you maybe mean my?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Mm]ah\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"\\1\" is an abbreviation for \"mahogany\". Did you maybe mean my?',
        suggestions: ["my"],
      });
    }
    
    return issues;
  },
};
