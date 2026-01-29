import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'much needed'
 * 
 * Source: LanguageTool (MUCH_NEEDED_HYPHEN)
 * Category: grammar
 */
export const muchNeededHyphenRule: GrammarRule = {
  id: 'much-needed-hyphen',
  name: 'missing hyphen in \'much needed\'',
  description: 'When \\3-\\4 is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bmuch\b\s+\bneeded\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \\3-\\4 is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
