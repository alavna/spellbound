import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sent an email to (email)
 * 
 * Source: LanguageTool (SENT_AN_EMAIL)
 * Category: style
 */
export const sentAnEmailRule: GrammarRule = {
  id: 'sent-an-email',
  name: 'sent an email to (email)',
  description: 'Consider using emailed.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsent\b\s+\ban?\s+\be-?mail\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using emailed.',
        suggestions: ["emailed"],
      });
    }
    
    return issues;
  },
};
