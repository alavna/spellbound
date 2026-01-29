import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a pare (pair) of
 * 
 * Source: LanguageTool (PARE_PAIR)
 * Category: grammar
 */
export const parePairRule: GrammarRule = {
  id: 'pare-pair',
  name: 'a pare (pair) of',
  description: 'The word \"\\3\" is a verb. Did you mean the noun pair?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|y?our|their|its\b\s+\S+\s+\bpare\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\3\" is a verb. Did you mean the noun pair?',
        suggestions: ["pair"],
      });
    }
    
    return issues;
  },
};
