import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Lowercase word after word and no space in between
 * 
 * Source: LanguageTool (LC_AFTER_PERIOD)
 * Category: grammar
 */
export const lcAfterPeriodRule: GrammarRule = {
  id: 'lc-after-period',
  name: 'Lowercase word after word and no space in between',
  description: 'If a new sentence starts here, add a space and start with an uppercase letter.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /.*[a-zöäüß]$\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If a new sentence starts here, add a space and start with an uppercase letter.',
        suggestions: ["\\3"],
      });
    }
    
    return issues;
  },
};
