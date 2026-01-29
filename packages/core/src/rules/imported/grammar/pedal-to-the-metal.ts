import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * petal to the metal
 * 
 * Source: LanguageTool (PEDAL_TO_THE_METAL)
 * Category: grammar
 */
export const pedalToTheMetalRule: GrammarRule = {
  id: 'pedal-to-the-metal',
  name: 'petal to the metal',
  description: 'Did you mean the idiom pedal \\2 \\3 \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpetal|pedel|paddle|patel|peddle\b\s+\bto\b\s+\bthe\b\s+\bmetal|floor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the idiom pedal \\2 \\3 \\4?',
        suggestions: ["pedal \\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
