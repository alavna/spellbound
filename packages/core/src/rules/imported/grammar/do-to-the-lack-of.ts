import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'Do to the lack of' → 'Due to lack of'
 * 
 * Source: LanguageTool (DO_TO_THE_LACK_OF)
 * Category: grammar
 */
export const doToTheLackOfRule: GrammarRule = {
  id: 'do-to-the-lack-of',
  name: '\'Do to the lack of\' → \'Due to lack of\'',
  description: 'Did you mean due to the \\4 of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo\b\s+\bto\b\s+\bthe\b\s+\black|absence\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean due to the \\4 of?',
        suggestions: ["due to the \\4 of"],
      });
    }
    
    return issues;
  },
};
