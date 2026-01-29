import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for the purpose of (to, for)
 * 
 * Source: LanguageTool (FOR_THE_PURPOSE_OF)
 * Category: style
 */
export const forThePurposeOfRule: GrammarRule = {
  id: 'for-the-purpose-of',
  name: 'for the purpose of (to, for)',
  description: 'Did you mean to or for?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bthe\b\s+\bpurpose\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to or for?',
        suggestions: ["to","for"],
      });
    }
    
    return issues;
  },
};
