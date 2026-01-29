import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Let's go to the movie some time (sometime)
 * 
 * Source: LanguageTool (DO_IT_SOMETIME)
 * Category: grammar
 */
export const doItSometimeRule: GrammarRule = {
  id: 'do-it-sometime',
  name: 'Let\'s go to the movie some time (sometime)',
  description: 'Instead of the noun phrase \'some time\', did you mean to use the adverb \'sometime\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Instead of the noun phrase \'some time\', did you mean to use the adverb \'sometime\'?',
        suggestions: ["sometime"],
      });
    }
    
    return issues;
  },
};
