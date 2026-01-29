import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the affirmative (yes, affirmatively)
 * 
 * Source: LanguageTool (IN_THE_AFFIRMATIVE)
 * Category: style
 */
export const inTheAffirmativeRule: GrammarRule = {
  id: 'in-the-affirmative',
  name: 'in the affirmative (yes, affirmatively)',
  description: 'Change to yes or affirmatively.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\baffirmative\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Change to yes or affirmatively.',
        suggestions: ["yes","affirmatively"],
      });
    }
    
    return issues;
  },
};
