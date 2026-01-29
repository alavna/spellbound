import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * playoff birth (berth)
 * 
 * Source: LanguageTool (PLAYOFF_BIRTH)
 * Category: grammar
 */
export const playoffBirthRule: GrammarRule = {
  id: 'playoff-birth',
  name: 'playoff birth (berth)',
  description: 'Did you mean playoff berth?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplayoff\b\s+\bbirth\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean playoff berth?',
        suggestions: ["playoff berth"],
      });
    }
    
    return issues;
  },
};
