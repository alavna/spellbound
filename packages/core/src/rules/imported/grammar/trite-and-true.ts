import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * trite (tried) and true
 * 
 * Source: LanguageTool (TRITE_AND_TRUE)
 * Category: grammar
 */
export const triteAndTrueRule: GrammarRule = {
  id: 'trite-and-true',
  name: 'trite (tried) and true',
  description: 'Did you mean tried and true?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btrite\b\s+\band\b\s+\btrue\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean tried and true?',
        suggestions: ["tried and true"],
      });
    }
    
    return issues;
  },
};
