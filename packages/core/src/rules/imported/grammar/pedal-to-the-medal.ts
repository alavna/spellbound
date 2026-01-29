import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pedal to the medal (metal)
 * 
 * Source: LanguageTool (PEDAL_TO_THE_MEDAL)
 * Category: grammar
 */
export const pedalToTheMedalRule: GrammarRule = {
  id: 'pedal-to-the-medal',
  name: 'pedal to the medal (metal)',
  description: 'Did you mean pedal to the metal?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpedal\b\s+\bto\b\s+\bthe\b\s+\bmedal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean pedal to the metal?',
        suggestions: ["pedal to the metal"],
      });
    }
    
    return issues;
  },
};
