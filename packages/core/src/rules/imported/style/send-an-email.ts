import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * send an email to (email)
 * 
 * Source: LanguageTool (SEND_AN_EMAIL)
 * Category: style
 */
export const sendAnEmailRule: GrammarRule = {
  id: 'send-an-email',
  name: 'send an email to (email)',
  description: 'Consider using email.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsend\b\s+\ban?\s+\bemail\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using email.',
        suggestions: ["email"],
      });
    }
    
    return issues;
  },
};
