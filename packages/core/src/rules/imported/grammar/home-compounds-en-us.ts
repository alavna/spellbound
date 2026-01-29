import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * home town (hometown)
 * 
 * Source: LanguageTool (HOME_COMPOUNDS_EN_US)
 * Category: grammar
 */
export const homeCompoundsEnUsRule: GrammarRule = {
  id: 'home-compounds-en-us',
  name: 'home town (hometown)',
  description: 'The word home is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhome\b\s+\btowns?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word home is normally spelled as one word.',
        suggestions: ["home"],
      });
    }
    
    return issues;
  },
};
