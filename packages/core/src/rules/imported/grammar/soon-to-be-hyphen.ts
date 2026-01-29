import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphens in 'soon to be'
 * 
 * Source: LanguageTool (SOON_TO_BE_HYPHEN)
 * Category: grammar
 */
export const soonToBeHyphenRule: GrammarRule = {
  id: 'soon-to-be-hyphen',
  name: 'missing hyphens in \'soon to be\'',
  description: 'The adjective \\2-\\3-\\4 requires hyphens.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|y?our|his|her|my|of|their|its|s|no|many\b\s+\bsoon\b\s+\bto\b\s+\bbe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\2-\\3-\\4 requires hyphens.',
        suggestions: ["\\2-\\3-\\4"],
      });
    }
    
    return issues;
  },
};
