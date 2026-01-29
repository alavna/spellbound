import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dob't
 * 
 * Source: LanguageTool (DOB_T)
 * Category: grammar
 */
export const dobTRule: GrammarRule = {
  id: 'dob-t',
  name: 'dob\'t',
  description: 'Did you mean don\\2\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo[mbhj]\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean don\\2\\3?',
        suggestions: ["don\\2\\3"],
      });
    }
    
    return issues;
  },
};
