import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'they ware' vs 'they were'
 * 
 * Source: LanguageTool (THEY_WARE)
 * Category: grammar
 */
export const theyWareRule: GrammarRule = {
  id: 'they-ware',
  name: '\'they ware\' vs \'they were\'',
  description: '\'ware\' is a noun. Did you mean were?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthey|we|you\b\s+\bware\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'ware\' is a noun. Did you mean were?',
        suggestions: ["were"],
      });
    }
    
    return issues;
  },
};
