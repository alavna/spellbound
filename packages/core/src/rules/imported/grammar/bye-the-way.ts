import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bye the way (by the way)
 * 
 * Source: LanguageTool (BYE_THE_WAY)
 * Category: grammar
 */
export const byeTheWayRule: GrammarRule = {
  id: 'bye-the-way',
  name: 'bye the way (by the way)',
  description: 'Did you mean by the way?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbye\b\s+\bthe\b\s+\bway\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean by the way?',
        suggestions: ["by the way"],
      });
    }
    
    return issues;
  },
};
