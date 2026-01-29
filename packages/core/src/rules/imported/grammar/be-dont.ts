import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I am don't (not) sure
 * 
 * Source: LanguageTool (BE_DONT)
 * Category: grammar
 */
export const beDontRule: GrammarRule = {
  id: 'be-dont',
  name: 'I am don\'t (not) sure',
  description: 'Did you mean \\3 not?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bdoes|do\b\s+\bn't|not\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\3 not?',
        suggestions: ["\\3 not"],
      });
    }
    
    return issues;
  },
};
