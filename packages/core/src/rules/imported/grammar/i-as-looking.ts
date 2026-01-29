import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I as (was) looking
 * 
 * Source: LanguageTool (I_AS_LOOKING)
 * Category: grammar
 */
export const iAsLookingRule: GrammarRule = {
  id: 'i-as-looking',
  name: 'I as (was) looking',
  description: 'Did you mean was?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|s?he|it\b\s+\bas|war\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean was?',
        suggestions: ["was"],
      });
    }
    
    return issues;
  },
};
