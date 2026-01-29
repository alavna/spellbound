import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sky scraper (skyscraper)
 * 
 * Source: LanguageTool (SKY_COMPOUNDS)
 * Category: grammar
 */
export const skyCompoundsRule: GrammarRule = {
  id: 'sky-compounds',
  name: 'sky scraper (skyscraper)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsky\b\s+\bscrapers?|rocket(s|ed|ing)?|borne|caps?|diving|divers?|dive[ds]?|hooks?|jack(s|ed)?|jackers?|jacking|lines?|larks?|sails?|walks?|ward\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["sky"],
      });
    }
    
    return issues;
  },
};
