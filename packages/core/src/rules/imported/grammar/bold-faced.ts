import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a bold-faced (bald-faced) lie
 * 
 * Source: LanguageTool (BOLD_FACED)
 * Category: grammar
 */
export const boldFacedRule: GrammarRule = {
  id: 'bold-faced',
  name: 'a bold-faced (bald-faced) lie',
  description: 'Did you mean bald-faced (= showing no shame)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbold-?faced?\s+\blies?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean bald-faced (= showing no shame)?',
        suggestions: ["bald-faced"],
      });
    }
    
    return issues;
  },
};
