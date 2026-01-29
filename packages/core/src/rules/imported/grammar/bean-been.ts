import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * have bean (been)
 * 
 * Source: LanguageTool (BEAN_BEEN)
 * Category: grammar
 */
export const beanBeenRule: GrammarRule = {
  id: 'bean-been',
  name: 'have bean (been)',
  description: 'Did you mean the verb been?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bbean\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb been?',
        suggestions: ["been"],
      });
    }
    
    return issues;
  },
};
