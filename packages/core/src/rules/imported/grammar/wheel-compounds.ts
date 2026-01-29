import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wheel chair (wheelchair)
 * 
 * Source: LanguageTool (WHEEL_COMPOUNDS)
 * Category: grammar
 */
export const wheelCompoundsRule: GrammarRule = {
  id: 'wheel-compounds',
  name: 'wheel chair (wheelchair)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwheel\b\s+\bchairs?|barrows?|bases?|houses?|wrights?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["wheel"],
      });
    }
    
    return issues;
  },
};
