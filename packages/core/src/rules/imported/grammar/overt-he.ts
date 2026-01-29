import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * overt he (over the)
 * 
 * Source: LanguageTool (OVERT_HE)
 * Category: grammar
 */
export const overtHeRule: GrammarRule = {
  id: 'overt-he',
  name: 'overt he (over the)',
  description: 'Did you mean over the?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bovert\b\s+[Hh]e\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean over the?',
        suggestions: ["over the"],
      });
    }
    
    return issues;
  },
};
