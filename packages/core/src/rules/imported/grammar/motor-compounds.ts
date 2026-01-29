import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * motor bike (motorbike)
 * 
 * Source: LanguageTool (MOTOR_COMPOUNDS)
 * Category: grammar
 */
export const motorCompoundsRule: GrammarRule = {
  id: 'motor-compounds',
  name: 'motor bike (motorbike)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmotor\b\s+\bbikes?|bikers?|boats?|cycles?|doms?|trucks?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["motor"],
      });
    }
    
    return issues;
  },
};
