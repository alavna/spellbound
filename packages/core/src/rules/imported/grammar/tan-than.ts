import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I am more tan (than) pleased
 * 
 * Source: LanguageTool (TAN_THAN)
 * Category: grammar
 */
export const tanThanRule: GrammarRule = {
  id: 'tan-than',
  name: 'I am more tan (than) pleased',
  description: 'Did you mean to write \"than\" here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmore|less\b\s+\btan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \"than\" here?',
        suggestions: ["than"],
      });
    }
    
    return issues;
  },
};
