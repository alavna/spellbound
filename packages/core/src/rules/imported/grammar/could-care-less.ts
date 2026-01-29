import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * could (couldn't) care less
 * 
 * Source: LanguageTool (COULD_CARE_LESS)
 * Category: grammar
 */
export const couldCareLessRule: GrammarRule = {
  id: 'could-care-less',
  name: 'could (couldn\'t) care less',
  description: 'Did you mean couldn\'t care less?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcould\b\s+\bcare\b\s+\bless\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean couldn\'t care less?',
        suggestions: ["couldn't care less"],
      });
    }
    
    return issues;
  },
};
