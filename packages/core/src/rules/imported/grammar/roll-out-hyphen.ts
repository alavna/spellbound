import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the roll out (roll-out)
 * 
 * Source: LanguageTool (ROLL_OUT_HYPHEN)
 * Category: grammar
 */
export const rollOutHyphenRule: GrammarRule = {
  id: 'roll-out-hyphen',
  name: 'the roll out (roll-out)',
  description: 'The noun \\3-\\4 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?|my|y?our|their|its|his|her|no|of|for|at|on\b\s+\S+\s+\broll\b\s+\bouts?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\3-\\4 is spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
