import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Have a bless (blessed) day
 * 
 * Source: LanguageTool (A_BLESS_DAY)
 * Category: grammar
 */
export const aBlessDayRule: GrammarRule = {
  id: 'a-bless-day',
  name: 'Have a bless (blessed) day',
  description: 'Did you mean blessed or blessing?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the\b\s+\bbless\b\s+\bday|week|month|year|weekend|holiday|vacation|&weekdays;/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean blessed or blessing?',
        suggestions: ["blessed","blessing"],
      });
    }
    
    return issues;
  },
};
