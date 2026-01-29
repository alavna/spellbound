import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing hyphen in 'second largest'
 * 
 * Source: LanguageTool (SECOND_LARGEST_HYPHEN)
 * Category: grammar
 */
export const secondLargestHyphenRule: GrammarRule = {
  id: 'second-largest-hyphen',
  name: 'Missing hyphen in \'second largest\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsecond|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth\b\s+\S+/gi;
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
