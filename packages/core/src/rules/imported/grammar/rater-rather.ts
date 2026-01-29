import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rater vs rather
 * 
 * Source: LanguageTool (RATER_RATHER)
 * Category: grammar
 */
export const raterRatherRule: GrammarRule = {
  id: 'rater-rather',
  name: 'rater vs rather',
  description: 'Did you mean the adverb rather?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwould|d|will|could|should|might\b\s+\brater\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb rather?',
        suggestions: ["rather"],
      });
    }
    
    return issues;
  },
};
