import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on a whole another (nother/different)
 * 
 * Source: LanguageTool (ON_A_WHOLE_ANOTHER)
 * Category: grammar
 */
export const onAWholeAnotherRule: GrammarRule = {
  id: 'on-a-whole-another',
  name: 'on a whole another (nother/different)',
  description: 'The correct spelling of this idiom is whole nother. However, \"whole nother\" is often considered informal and is inappropriate in most business and academic contexts.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[oi]n|at\b\s+\ba\b\s+\bwhole\b\s+\banother\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct spelling of this idiom is whole nother. However, \"whole nother\" is often considered informal and is inappropriate in most business and academic contexts.',
        suggestions: ["whole nother","whole other","whole different"],
      });
    }
    
    return issues;
  },
};
