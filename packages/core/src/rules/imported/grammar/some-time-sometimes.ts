import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Some time (Sometimes) I like to read fiction
 * 
 * Source: LanguageTool (SOME_TIME_SOMETIMES)
 * Category: grammar
 */
export const someTimeSometimesRule: GrammarRule = {
  id: 'some-time-sometimes',
  name: 'Some time (Sometimes) I like to read fiction',
  description: 'Instead of the noun phrase \'some time\', did you mean to use the adverb?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bsome\b\s+\btime\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Instead of the noun phrase \'some time\', did you mean to use the adverb?',
        suggestions: ["sometimes"],
      });
    }
    
    return issues;
  },
};
