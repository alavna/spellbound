import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to the manor (manner) born
 * 
 * Source: LanguageTool (TO_THE_MANOR_BORN)
 * Category: grammar
 */
export const toTheManorBornRule: GrammarRule = {
  id: 'to-the-manor-born',
  name: 'to the manor (manner) born',
  description: 'Did you mean to the manner born?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\bthe\b\s+\bmanor\b\s+\bborn\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to the manner born?',
        suggestions: ["to the manner born"],
      });
    }
    
    return issues;
  },
};
