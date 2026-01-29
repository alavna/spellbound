import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I got most of it did (done) yesterday
 * 
 * Source: LanguageTool (GOT_IT_DONE)
 * Category: grammar
 */
export const gotItDoneRule: GrammarRule = {
  id: 'got-it-done',
  name: 'I got most of it did (done) yesterday',
  description: 'Possible tense error. Did you mean the past participle?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bdid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible tense error. Did you mean the past participle?',
        suggestions: ["done"],
      });
    }
    
    return issues;
  },
};
