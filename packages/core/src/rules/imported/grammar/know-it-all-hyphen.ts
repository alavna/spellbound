import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphens in 'know it all'
 * 
 * Source: LanguageTool (KNOW_IT_ALL_HYPHEN)
 * Category: grammar
 */
export const knowItAllHyphenRule: GrammarRule = {
  id: 'know-it-all-hyphen',
  name: 'missing hyphens in \'know it all\'',
  description: 'The noun or adjective \\3-\\4-\\5 is spelled with hyphens.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|my|his|her|their|y?our\b\s+\bknow\b\s+\bit\b\s+\balls?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun or adjective \\3-\\4-\\5 is spelled with hyphens.',
        suggestions: ["\\3-\\4-\\5"],
      });
    }
    
    return issues;
  },
};
