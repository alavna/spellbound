import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hi (his, high) time
 * 
 * Source: LanguageTool (HI_TIME)
 * Category: grammar
 */
export const hiTimeRule: GrammarRule = {
  id: 'hi-time',
  name: 'hi (his, high) time',
  description: 'Did you mean high \\2 or his \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhi\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean high \\2 or his \\2?',
        suggestions: ["high \\2","his \\2"],
      });
    }
    
    return issues;
  },
};
