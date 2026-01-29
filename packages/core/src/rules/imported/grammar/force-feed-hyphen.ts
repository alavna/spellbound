import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'force feed'
 * 
 * Source: LanguageTool (FORCE_FEED_HYPHEN)
 * Category: grammar
 */
export const forceFeedHyphenRule: GrammarRule = {
  id: 'force-feed-hyphen',
  name: 'missing hyphen in \'force feed\'',
  description: 'It appears that a hyphen is missing in the verb \\1-\\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bforce\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing in the verb \\1-\\2.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
