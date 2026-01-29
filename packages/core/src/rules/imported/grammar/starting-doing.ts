import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he has starting (started) doing that
 * 
 * Source: LanguageTool (STARTING_DOING)
 * Category: grammar
 */
export const startingDoingRule: GrammarRule = {
  id: 'starting-doing',
  name: 'he has starting (started) doing that',
  description: 'Possible typo found: Did you mean to use the past participle?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo found: Did you mean to use the past participle?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
