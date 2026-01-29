import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'so called'
 * 
 * Source: LanguageTool (SO_CALLED_HYPHEN)
 * Category: grammar
 */
export const soCalledHyphenRule: GrammarRule = {
  id: 'so-called-hyphen',
  name: 'missing hyphen in \'so called\'',
  description: 'The expression \'\\1-\\2\' is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ss]o\b\s+\bcalled\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The expression \'\\1-\\2\' is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
