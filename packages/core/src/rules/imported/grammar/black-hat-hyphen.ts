import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * black hat (black-hat) hacker
 * 
 * Source: LanguageTool (BLACK_HAT_HYPHEN)
 * Category: grammar
 */
export const blackHatHyphenRule: GrammarRule = {
  id: 'black-hat-hyphen',
  name: 'black hat (black-hat) hacker',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bblack|white\b\s+\bhat\b\s+\bSEOs?|hackers?|hacking|techniques?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
