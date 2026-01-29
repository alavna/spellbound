import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * or way (was) it
 * 
 * Source: LanguageTool (OR_WAY_IT)
 * Category: grammar
 */
export const orWayItRule: GrammarRule = {
  id: 'or-way-it',
  name: 'or way (was) it',
  description: 'Did you mean was?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bor\b\s+\bway\b\s+(it|that|this)/gi;
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
