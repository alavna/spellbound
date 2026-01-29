import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the (they, there) are
 * 
 * Source: LanguageTool (THE_ARE)
 * Category: grammar
 */
export const theAreRule: GrammarRule = {
  id: 'the-are',
  name: 'the (they, there) are',
  description: 'Did you mean they \\2 or there \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bare\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean they \\2 or there \\2?',
        suggestions: ["they \\2","there \\2"],
      });
    }
    
    return issues;
  },
};
