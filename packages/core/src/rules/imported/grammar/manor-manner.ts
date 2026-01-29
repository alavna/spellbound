import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * manor vs manner
 * 
 * Source: LanguageTool (MANOR_MANNER)
 * Category: grammar
 */
export const manorMannerRule: GrammarRule = {
  id: 'manor-manner',
  name: 'manor vs manner',
  description: 'Did you mean manner (= a way in which a thing is done or happens)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\ban?\s+\S+\s+\bmanor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean manner (= a way in which a thing is done or happens)?',
        suggestions: ["manner"],
      });
    }
    
    return issues;
  },
};
