import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be ware (beware)
 * 
 * Source: LanguageTool (BE_WARE)
 * Category: grammar
 */
export const beWareRule: GrammarRule = {
  id: 'be-ware',
  name: 'be ware (beware)',
  description: 'Did you mean beware?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\bware\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean beware?',
        suggestions: ["beware"],
      });
    }
    
    return issues;
  },
};
