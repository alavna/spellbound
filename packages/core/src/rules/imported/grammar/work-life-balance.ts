import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'work life balance'
 * 
 * Source: LanguageTool (WORK_LIFE_BALANCE)
 * Category: grammar
 */
export const workLifeBalanceRule: GrammarRule = {
  id: 'work-life-balance',
  name: 'missing hyphen in \'work life balance\'',
  description: 'This expression is usually spelled with a hyphen between \'work\' and \'life\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwork\b\s+\bli[vf]e\b\s+\bbalance|interfaces?|conflict|enrichment\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This expression is usually spelled with a hyphen between \'work\' and \'life\'.',
        suggestions: ["\\1-"],
      });
    }
    
    return issues;
  },
};
