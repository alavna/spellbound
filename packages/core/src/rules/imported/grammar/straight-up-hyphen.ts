import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * straight up (straight-up)
 * 
 * Source: LanguageTool (STRAIGHT_UP_HYPHEN)
 * Category: grammar
 */
export const straightUpHyphenRule: GrammarRule = {
  id: 'straight-up-hyphen',
  name: 'straight up (straight-up)',
  description: 'The adjective \\4-\\5 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bstraight\b\s+\bup|time\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\4-\\5 is spelled with a hyphen.',
        suggestions: ["\\4-\\5"],
      });
    }
    
    return issues;
  },
};
