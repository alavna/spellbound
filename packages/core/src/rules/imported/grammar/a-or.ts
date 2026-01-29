import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * once a (or) twice
 * 
 * Source: LanguageTool (A_OR)
 * Category: grammar
 */
export const aOrRule: GrammarRule = {
  id: 'a-or',
  name: 'once a (or) twice',
  description: 'Did you mean or?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bonce\b\s+\ba\b\s+\btwice\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean or?',
        suggestions: ["or"],
      });
    }
    
    return issues;
  },
};
