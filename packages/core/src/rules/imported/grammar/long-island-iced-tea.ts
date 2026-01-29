import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Long Island iced tea
 * 
 * Source: LanguageTool (LONG_ISLAND_ICED_TEA)
 * Category: grammar
 */
export const longIslandIcedTeaRule: GrammarRule = {
  id: 'long-island-iced-tea',
  name: 'Long Island iced tea',
  description: 'The proper spelling for this alcoholic mixed drink is Long Island iced .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blon?g\b\s+\bisland|iceland\b\s+\biced?\s+\bteas?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The proper spelling for this alcoholic mixed drink is Long Island iced .',
        suggestions: ["Long Island iced"],
      });
    }
    
    return issues;
  },
};
