import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * don't will (won't)
 * 
 * Source: LanguageTool (DONT_WILL)
 * Category: grammar
 */
export const dontWillRule: GrammarRule = {
  id: 'dont-will',
  name: 'don\'t will (won\'t)',
  description: 'Did you mean won\'t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(?!\bwho\b)\S+\s+\bdo\b\s+\bn't\b\s+\bwill\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean won\'t?',
        suggestions: ["won't"],
      });
    }
    
    return issues;
  },
};
