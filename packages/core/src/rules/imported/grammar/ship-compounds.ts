import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * space ship (spaceship)
 * 
 * Source: LanguageTool (SHIP_COMPOUNDS)
 * Category: grammar
 */
export const shipCompoundsRule: GrammarRule = {
  id: 'ship-compounds',
  name: 'space ship (spaceship)',
  description: 'This noun is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bspace|relation|intern|member|leader|mentor|flag|town|trainee|citizen|scholar|owner|controller|dictator|champion|fellow|censor|apprentice|partner|friend|dealer|battle|author\b\s+\bships?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
