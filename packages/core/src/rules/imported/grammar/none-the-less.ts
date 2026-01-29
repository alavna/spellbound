import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * none the less (nonetheless)
 * 
 * Source: LanguageTool (NONE_THE_LESS)
 * Category: grammar
 */
export const noneTheLessRule: GrammarRule = {
  id: 'none-the-less',
  name: 'none the less (nonetheless)',
  description: 'Did you mean the adverbial phrase nonetheless?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnone?\s+\bthe\b\s+\bless\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverbial phrase nonetheless?',
        suggestions: ["nonetheless"],
      });
    }
    
    return issues;
  },
};
