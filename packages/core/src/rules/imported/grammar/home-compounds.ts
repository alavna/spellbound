import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * home land (homeland)
 * 
 * Source: LanguageTool (HOME_COMPOUNDS)
 * Category: grammar
 */
export const homeCompoundsRule: GrammarRule = {
  id: 'home-compounds',
  name: 'home land (homeland)',
  description: 'The word home is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhome\b\s+\blands?|made|sickness(es)?|schooling|grown|work|boys?/gi;
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
