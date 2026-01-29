import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * objective case after with(out)/at/to/...
 * 
 * Source: LanguageTool (OBJECTIVE_CASE)
 * Category: grammar
 */
export const objectiveCaseRule: GrammarRule = {
  id: 'objective-case',
  name: 'objective case after with(out)/at/to/...',
  description: 'The object form of the pronoun may be required here. Did you mean \\1 me, \\1 her, \\1 him, \\1 us, or \\1 them?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bI|[hw]e|she|they\b\s+[\.\.!]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The object form of the pronoun may be required here. Did you mean \\1 me, \\1 her, \\1 him, \\1 us, or \\1 them?',
        suggestions: ["\\1 me","\\1 her","\\1 him","\\1 us","\\1 them"],
      });
    }
    
    return issues;
  },
};
