import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Los Angels (Los Angeles)
 * 
 * Source: LanguageTool (LOS_ANGELS)
 * Category: grammar
 */
export const losAngelsRule: GrammarRule = {
  id: 'los-angels',
  name: 'Los Angels (Los Angeles)',
  description: 'Did you mean Los Angeles?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bl[ao]s\b\s+\bangel[oe]?s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Los Angeles?',
        suggestions: ["Los Angeles"],
      });
    }
    
    return issues;
  },
};
