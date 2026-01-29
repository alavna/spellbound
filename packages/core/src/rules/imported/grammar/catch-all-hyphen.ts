import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'catch-all'
 * 
 * Source: LanguageTool (CATCH_ALL_HYPHEN)
 * Category: grammar
 */
export const catchAllHyphenRule: GrammarRule = {
  id: 'catch-all-hyphen',
  name: 'missing hyphen in \'catch-all\'',
  description: 'It seems that a hyphen in the noun or adjective \\3-\\4 is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|my|y?our|its|his|her|their|s|of|no|many\b\s+\bcatch\b\s+\ball\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a hyphen in the noun or adjective \\3-\\4 is missing.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
