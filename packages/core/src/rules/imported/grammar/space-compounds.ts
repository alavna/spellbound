import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * space ship (spaceship)
 * 
 * Source: LanguageTool (SPACE_COMPOUNDS)
 * Category: grammar
 */
export const spaceCompoundsRule: GrammarRule = {
  id: 'space-compounds',
  name: 'space ship (spaceship)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bspace\b\s+\bcrafts?|suites?|walkers?|ships?|ports?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: ["space"],
      });
    }
    
    return issues;
  },
};
