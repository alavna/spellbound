import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * there are also other (also)
 * 
 * Source: LanguageTool (ALSO_OTHER)
 * Category: style
 */
export const alsoOtherRule: GrammarRule = {
  id: 'also-other',
  name: 'there are also other (also)',
  description: 'Consider using there are other or there are also',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthere\b\s+\bare\b\s+\balso\b\s+\bother\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using there are other or there are also',
        suggestions: ["there are other","there are also"],
      });
    }
    
    return issues;
  },
};
