import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * couldn't careless (care less)
 * 
 * Source: LanguageTool (COULDNT_CARELESS)
 * Category: grammar
 */
export const couldntCarelessRule: GrammarRule = {
  id: 'couldnt-careless',
  name: 'couldn\'t careless (care less)',
  description: 'Did you mean care less?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcould\b\s+\bn't\b\s+\bcareless\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean care less?',
        suggestions: ["care less"],
      });
    }
    
    return issues;
  },
};
