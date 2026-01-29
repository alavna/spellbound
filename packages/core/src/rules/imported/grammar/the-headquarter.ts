import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the + headquarter
 * 
 * Source: LanguageTool (THE_HEADQUARTER)
 * Category: grammar
 */
export const theHeadquarterRule: GrammarRule = {
  id: 'the-headquarter',
  name: 'the + headquarter',
  description: 'The word \'\\2\' is a verb. The noun to describe a corporate head office ends with an \'s\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe(ir)?|'s|our|my|an?\s+\S+\s+\bheadquarter\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\2\' is a verb. The noun to describe a corporate head office ends with an \'s\'.',
        suggestions: ["headquarters"],
      });
    }
    
    return issues;
  },
};
