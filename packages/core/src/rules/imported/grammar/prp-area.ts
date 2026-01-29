import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * they area (are)
 * 
 * Source: LanguageTool (PRP_AREA)
 * Category: grammar
 */
export const prpAreaRule: GrammarRule = {
  id: 'prp-area',
  name: 'they area (are)',
  description: 'Did you mean are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthey|you|we\b\s+\barea\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean are?',
        suggestions: ["are"],
      });
    }
    
    return issues;
  },
};
