import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * news worthy (newsworthy)
 * 
 * Source: LanguageTool (WORTHY_COMPOUNDS)
 * Category: grammar
 */
export const worthyCompoundsRule: GrammarRule = {
  id: 'worthy-compounds',
  name: 'news worthy (newsworthy)',
  description: 'This adjective is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\buntrust|praise|credit|unnews|trust|blame|crash|unsea|thank|note|news|road|sea|air\b\s+\bworthy\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This adjective is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
