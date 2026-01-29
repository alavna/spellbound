import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * At 7 clock (o'clock)
 * 
 * Source: LanguageTool (AT_CD_CLOCK)
 * Category: grammar
 */
export const atCdClockRule: GrammarRule = {
  id: 'at-cd-clock',
  name: 'At 7 clock (o\'clock)',
  description: 'Did you mean o\'clock?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat\b\s+\S+\s+\bclock\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean o\'clock?',
        suggestions: ["o'clock"],
      });
    }
    
    return issues;
  },
};
