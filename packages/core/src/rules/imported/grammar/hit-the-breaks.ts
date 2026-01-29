import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hit the breaks (brakes)
 * 
 * Source: LanguageTool (HIT_THE_BREAKS)
 * Category: grammar
 */
export const hitTheBreaksRule: GrammarRule = {
  id: 'hit-the-breaks',
  name: 'hit the breaks (brakes)',
  description: 'Did you mean hit the brakes?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhit\b\s+\bthe\b\s+\bbreaks\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean hit the brakes?',
        suggestions: ["hit the brakes"],
      });
    }
    
    return issues;
  },
};
