import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: associates to/with
 * 
 * Source: LanguageTool (ASSOCIATES_TO)
 * Category: grammar
 */
export const associatesToRule: GrammarRule = {
  id: 'associates-to',
  name: 'Collocation: associates to/with',
  description: 'Did you mean \\1 \\2 \\3 with? The usual preposition for the word \"associate\" is \"with\" not \"to\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bassociate[sd]?\s+\S+\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 \\2 \\3 with? The usual preposition for the word \"associate\" is \"with\" not \"to\".',
        suggestions: ["\\1 \\2 \\3 with"],
      });
    }
    
    return issues;
  },
};
