import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I remember how it effected (affected) the job market
 * 
 * Source: LanguageTool (AFFECTED_EFFECTED)
 * Category: grammar
 */
export const affectedEffectedRule: GrammarRule = {
  id: 'affected-effected',
  name: 'I remember how it effected (affected) the job market',
  description: 'Possible error detected. Did you mean to use the verb \'affect\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible error detected. Did you mean to use the verb \'affect\'?',
        suggestions: ["affect"],
      });
    }
    
    return issues;
  },
};
