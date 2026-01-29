import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: duty free
 * 
 * Source: LanguageTool (CA_DUTY_FREE)
 * Category: grammar
 */
export const caDutyFreeRule: GrammarRule = {
  id: 'ca-duty-free',
  name: 'Compound adjective: duty free',
  description: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bduty\b\s+\bfree\b\s+\S+/gi;
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
