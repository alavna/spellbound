import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in parenthesis (in parentheses)
 * 
 * Source: LanguageTool (IN_PARENTHESIS)
 * Category: grammar
 */
export const inParenthesisRule: GrammarRule = {
  id: 'in-parenthesis',
  name: 'in parenthesis (in parentheses)',
  description: 'Did you mean in parentheses? \'parenthesis\' is the singular.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bparenthesis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in parentheses? \'parenthesis\' is the singular.',
        suggestions: ["in parentheses"],
      });
    }
    
    return issues;
  },
};
