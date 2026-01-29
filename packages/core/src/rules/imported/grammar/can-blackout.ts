import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * can blackout (black out)
 * 
 * Source: LanguageTool (CAN_BLACKOUT)
 * Category: grammar
 */
export const canBlackoutRule: GrammarRule = {
  id: 'can-blackout',
  name: 'can blackout (black out)',
  description: 'Did you mean can black out?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan\b\s+\bblackout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean can black out?',
        suggestions: ["can black out"],
      });
    }
    
    return issues;
  },
};
