import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * SUPERLATIVE + THAN, e.g. worst (worse) than
 * 
 * Source: LanguageTool (SUPERLATIVE_THAN)
 * Category: grammar
 */
export const superlativeThanRule: GrammarRule = {
  id: 'superlative-than',
  name: 'SUPERLATIVE + THAN, e.g. worst (worse) than',
  description: 'Use \\2 to make a comparison with this adjective.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use \\2 to make a comparison with this adjective.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
