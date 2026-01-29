import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphens in 'day to day'
 * 
 * Source: LanguageTool (DAY_TO_DAY_HYPHEN)
 * Category: grammar
 */
export const dayToDayHyphenRule: GrammarRule = {
  id: 'day-to-day-hyphen',
  name: 'missing hyphens in \'day to day\'',
  description: 'It appears that two hyphens are missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|their|our|your|'s\b\s+\S+\s+\bday|town|month|year|week|job|eye|door\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that two hyphens are missing.',
        suggestions: ["\\2-\\3-\\4"],
      });
    }
    
    return issues;
  },
};
