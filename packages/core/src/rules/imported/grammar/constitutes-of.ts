import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * constitutes (consists) of
 * 
 * Source: LanguageTool (CONSTITUTES_OF)
 * Category: grammar
 */
export const constitutesOfRule: GrammarRule = {
  id: 'constitutes-of',
  name: 'constitutes (consists) of',
  description: 'Did you mean consists of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bconstitutes\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean consists of?',
        suggestions: ["consists of"],
      });
    }
    
    return issues;
  },
};
