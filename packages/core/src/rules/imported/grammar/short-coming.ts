import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * short coming (shortcoming)
 * 
 * Source: LanguageTool (SHORT_COMING)
 * Category: grammar
 */
export const shortComingRule: GrammarRule = {
  id: 'short-coming',
  name: 'short coming (shortcoming)',
  description: 'Did you mean short?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bshort\b\s+\bcomings?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean short?',
        suggestions: ["short"],
      });
    }
    
    return issues;
  },
};
