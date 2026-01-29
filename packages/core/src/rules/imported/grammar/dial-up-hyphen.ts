import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dial up (dial-up) internet
 * 
 * Source: LanguageTool (DIAL_UP_HYPHEN)
 * Category: grammar
 */
export const dialUpHyphenRule: GrammarRule = {
  id: 'dial-up-hyphen',
  name: 'dial up (dial-up) internet',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdial\b\s+\bup\b\s+\binternet|telephones?|modems?|connections?|access|sounds?|IP|providers?|cables?/gi;
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
