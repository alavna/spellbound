import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * too ADJECTIVE to
 * 
 * Source: LanguageTool (TOO_ADJECTIVE_TO)
 * Category: grammar
 */
export const tooAdjectiveToRule: GrammarRule = {
  id: 'too-adjective-to',
  name: 'too ADJECTIVE to',
  description: 'Did you mean \\1o \\2 \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1o \\2 \\4?',
        suggestions: ["\\1o \\2 \\4"],
      });
    }
    
    return issues;
  },
};
