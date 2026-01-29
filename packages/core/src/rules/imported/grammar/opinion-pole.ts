import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * opinion/... pole (poll)
 * 
 * Source: LanguageTool (OPINION_POLE)
 * Category: grammar
 */
export const opinionPoleRule: GrammarRule = {
  id: 'opinion-pole',
  name: 'opinion/... pole (poll)',
  description: 'Did you mean poll?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bopinion|government|election|exit\b\s+\bpole\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean poll?',
        suggestions: ["poll"],
      });
    }
    
    return issues;
  },
};
