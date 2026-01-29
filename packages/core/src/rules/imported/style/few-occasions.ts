import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on a few occasions (occasionally)
 * 
 * Source: LanguageTool (FEW_OCCASIONS)
 * Category: style
 */
export const fewOccasionsRule: GrammarRule = {
  id: 'few-occasions',
  name: 'on a few occasions (occasionally)',
  description: 'Consider using occasionally',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\ba\b\s+\bfew\b\s+\boccasions\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using occasionally',
        suggestions: ["occasionally"],
      });
    }
    
    return issues;
  },
};
