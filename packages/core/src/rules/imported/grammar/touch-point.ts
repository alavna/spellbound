import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Touch point (Touchpoint)
 * 
 * Source: LanguageTool (TOUCH_POINT)
 * Category: grammar
 */
export const touchPointRule: GrammarRule = {
  id: 'touch-point',
  name: 'Touch point (Touchpoint)',
  description: 'The noun touch is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btouch\b\s+\bpoints?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun touch is spelled as one word.',
        suggestions: ["touch"],
      });
    }
    
    return issues;
  },
};
