import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'break out'
 * 
 * Source: LanguageTool (BREAK_OUT_HYPHEN)
 * Category: grammar
 */
export const breakOutHyphenRule: GrammarRule = {
  id: 'break-out-hyphen',
  name: 'missing hyphen in \'break out\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbreak\b\s+\bout\b\s+\bsessions?/gi;
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
