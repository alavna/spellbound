import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * reigns (reins) of power
 * 
 * Source: LanguageTool (REIGNS_OF_POWER)
 * Category: grammar
 */
export const reignsOfPowerRule: GrammarRule = {
  id: 'reigns-of-power',
  name: 'reigns (reins) of power',
  description: 'Did you mean reins of power?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\breigns\b\s+\bof\b\s+\bpower\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean reins of power?',
        suggestions: ["reins of power"],
      });
    }
    
    return issues;
  },
};
