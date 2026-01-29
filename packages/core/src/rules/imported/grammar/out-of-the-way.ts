import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out of the way (out-of-the-way) etc.
 * 
 * Source: LanguageTool (OUT_OF_THE_WAY)
 * Category: grammar
 */
export const outOfTheWayRule: GrammarRule = {
  id: 'out-of-the-way',
  name: 'out of the way (out-of-the-way) etc.',
  description: 'Did you mean out-of-the-\\5?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|their|our|your|s\b\s+\S+\s+\bout\b\s+\bof\b\s+\bthe\b\s+\bway|box|blue\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean out-of-the-\\5?',
        suggestions: ["out-of-the-\\5"],
      });
    }
    
    return issues;
  },
};
