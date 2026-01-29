import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be advised
 * 
 * Source: LanguageTool (BE_ADVISED)
 * Category: style
 */
export const beAdvisedRule: GrammarRule = {
  id: 'be-advised',
  name: 'be advised',
  description: 'Remove wordy \"\\1 \\2\"',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\badvised\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Remove wordy \"\\1 \\2\"',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
