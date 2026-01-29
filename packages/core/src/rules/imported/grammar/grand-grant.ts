import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * grand vs grant
 * 
 * Source: LanguageTool (GRAND_GRANT)
 * Category: grammar
 */
export const grandGrantRule: GrammarRule = {
  id: 'grand-grant',
  name: 'grand vs grant',
  description: 'Did you mean the verb grant? \"Grand\" is an adjective.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bgrand\b\s+\S+\s+\S+\s+\brights?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb grant? \"Grand\" is an adjective.',
        suggestions: ["grant"],
      });
    }
    
    return issues;
  },
};
