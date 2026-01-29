import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ponzi scheme
 * 
 * Source: LanguageTool (PONZI_SCHEME)
 * Category: grammar
 */
export const ponziSchemeRule: GrammarRule = {
  id: 'ponzi-scheme',
  name: 'Ponzi scheme',
  description: 'The name \"Ponzi\" needs to be capitalized in the noun Ponzi \\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bponzi\b\s+\bschemes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name \"Ponzi\" needs to be capitalized in the noun Ponzi \\2.',
        suggestions: ["Ponzi \\2"],
      });
    }
    
    return issues;
  },
};
