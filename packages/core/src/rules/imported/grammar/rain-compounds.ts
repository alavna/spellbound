import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rain bow (rainbow)
 * 
 * Source: LanguageTool (RAIN_COMPOUNDS)
 * Category: grammar
 */
export const rainCompoundsRule: GrammarRule = {
  id: 'rain-compounds',
  name: 'rain bow (rainbow)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brain\b\s+\bbows?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
