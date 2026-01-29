import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: follow up
 * 
 * Source: LanguageTool (CA_FOLLOW_UP)
 * Category: grammar
 */
export const caFollowUpRule: GrammarRule = {
  id: 'ca-follow-up',
  name: 'Compound adjective: follow up',
  description: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bup|on\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
