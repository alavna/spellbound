import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He's the best of all times
 * 
 * Source: LanguageTool (OF_ALL_TIMES)
 * Category: grammar
 */
export const ofAllTimesRule: GrammarRule = {
  id: 'of-all-times',
  name: 'He\'s the best of all times',
  description: 'In this context, the idiom needs to be spelled \\2 \\3 .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bof\b\s+\ball\b\s+\btimes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the idiom needs to be spelled \\2 \\3 .',
        suggestions: ["\\2 \\3"],
      });
    }
    
    return issues;
  },
};
