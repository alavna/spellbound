import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * peddle (paddle/pedal)
 * 
 * Source: LanguageTool (PEDDLE_PADDLE)
 * Category: grammar
 */
export const peddlePaddleRule: GrammarRule = {
  id: 'peddle-paddle',
  name: 'peddle (paddle/pedal)',
  description: 'Did you mean paddle (= used to move a boat) or pedal (= used to ride or drive)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|the|no|my|y?our|his|their\b\s+\bpeddles?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean paddle (= used to move a boat) or pedal (= used to ride or drive)?',
        suggestions: ["paddle","pedal"],
      });
    }
    
    return issues;
  },
};
