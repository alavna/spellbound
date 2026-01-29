import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fire fighter (firefighter)
 * 
 * Source: LanguageTool (FIGHTER_COMPOUNDS)
 * Category: grammar
 */
export const fighterCompoundsRule: GrammarRule = {
  id: 'fighter-compounds',
  name: 'fire fighter (firefighter)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfire|prize|gun|bull\b\s+\bfighters?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
