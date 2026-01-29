import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on two separate occasions (twice)
 * 
 * Source: LanguageTool (ON_TWO_SEPARATE_OCCASIONS)
 * Category: style
 */
export const onTwoSeparateOccasionsRule: GrammarRule = {
  id: 'on-two-separate-occasions',
  name: 'on two separate occasions (twice)',
  description: 'Did you mean twice?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\btwo\b\s+\bseparate\b\s+\boccasions\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean twice?',
        suggestions: ["twice"],
      });
    }
    
    return issues;
  },
};
