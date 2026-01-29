import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for sometime → for some time
 * 
 * Source: LanguageTool (FOR_SOMETIME_FOR_SOME_TIME)
 * Category: grammar
 */
export const forSometimeForSomeTimeRule: GrammarRule = {
  id: 'for-sometime-for-some-time',
  name: 'for sometime → for some time',
  description: 'The adverb \"sometime\" means \"at some point in the future\". Did you mean some time (which often means \"a long span of time\" as in the phrase \"for some time\" or \"in some time\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor|in|at|to\b\s+\bsometime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adverb \"sometime\" means \"at some point in the future\". Did you mean some time (which often means \"a long span of time\" as in the phrase \"for some time\" or \"in some time\")?',
        suggestions: ["some time"],
      });
    }
    
    return issues;
  },
};
