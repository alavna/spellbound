import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * some what (somewhat)
 * 
 * Source: LanguageTool (SOME_WHAT_JJ)
 * Category: grammar
 */
export const someWhatJjRule: GrammarRule = {
  id: 'some-what-jj',
  name: 'some what (somewhat)',
  description: 'Did you mean \\1\\2 (= slightly)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome\b\s+\bwhat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2 (= slightly)?',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
