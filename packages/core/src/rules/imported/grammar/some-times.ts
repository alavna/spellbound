import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * some times (sometimes)
 * 
 * Source: LanguageTool (SOME_TIMES)
 * Category: grammar
 */
export const someTimesRule: GrammarRule = {
  id: 'some-times',
  name: 'some times (sometimes)',
  description: 'Did you mean the adverb sometimes (= occasionally)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome\b\s+\btimes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb sometimes (= occasionally)?',
        suggestions: ["sometimes"],
      });
    }
    
    return issues;
  },
};
