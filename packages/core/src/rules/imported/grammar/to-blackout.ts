import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to blackout (black out)
 * 
 * Source: LanguageTool (TO_BLACKOUT)
 * Category: grammar
 */
export const toBlackoutRule: GrammarRule = {
  id: 'to-blackout',
  name: 'to blackout (black out)',
  description: 'Did you mean to black out?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bblackout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to black out?',
        suggestions: ["to black out"],
      });
    }
    
    return issues;
  },
};
