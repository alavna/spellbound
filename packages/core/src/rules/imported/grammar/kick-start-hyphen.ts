import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * kick start (kick-start)
 * 
 * Source: LanguageTool (KICK_START_HYPHEN)
 * Category: grammar
 */
export const kickStartHyphenRule: GrammarRule = {
  id: 'kick-start-hyphen',
  name: 'kick start (kick-start)',
  description: 'The word \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bkick\b\s+\bstart(ed|ing|s)?|starters?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
