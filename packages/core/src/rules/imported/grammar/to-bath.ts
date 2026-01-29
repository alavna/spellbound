import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to bath (bathe)
 * 
 * Source: LanguageTool (TO_BATH)
 * Category: grammar
 */
export const toBathRule: GrammarRule = {
  id: 'to-bath',
  name: 'to bath (bathe)',
  description: 'Did you mean the verb \\2e?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto|will|[cw]ould|can\b\s+(sun)?bath\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb \\2e?',
        suggestions: ["\\2e"],
      });
    }
    
    return issues;
  },
};
