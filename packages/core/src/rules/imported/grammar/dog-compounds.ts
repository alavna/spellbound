import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bull dog (bulldog)
 * 
 * Source: LanguageTool (DOG_COMPOUNDS)
 * Category: grammar
 */
export const dogCompoundsRule: GrammarRule = {
  id: 'dog-compounds',
  name: 'bull dog (bulldog)',
  description: 'The noun bull is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbull\b\s+\bdogs?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun bull is spelled as one word.',
        suggestions: ["bull"],
      });
    }
    
    return issues;
  },
};
