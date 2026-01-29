import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * news paper (newspaper)
 * 
 * Source: LanguageTool (NEWS_COMPOUNDS)
 * Category: grammar
 */
export const newsCompoundsRule: GrammarRule = {
  id: 'news-compounds',
  name: 'news paper (newspaper)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnews\b\s+\bpapers?|letters?|readers?|rooms?|agents?|dealers?|groups?|hounds?|makers?|reels?|wom[ea]n|wires?|stands?|casts?|casters?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["news"],
      });
    }
    
    return issues;
  },
};
