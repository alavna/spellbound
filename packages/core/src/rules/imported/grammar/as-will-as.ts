import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as will (well) as
 * 
 * Source: LanguageTool (AS_WILL_AS)
 * Category: grammar
 */
export const asWillAsRule: GrammarRule = {
  id: 'as-will-as',
  name: 'as will (well) as',
  description: 'Did you mean as well as?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bwill\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean as well as?',
        suggestions: ["as well as"],
      });
    }
    
    return issues;
  },
};
