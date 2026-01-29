import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I got hear (here/heard)
 * 
 * Source: LanguageTool (GOT_HERE)
 * Category: grammar
 */
export const gotHereRule: GrammarRule = {
  id: 'got-here',
  name: 'I got hear (here/heard)',
  description: 'Did you mean the adverb here (= at this place) or the verb heard?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bhear\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb here (= at this place) or the verb heard?',
        suggestions: ["here","heard"],
      });
    }
    
    return issues;
  },
};
