import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * them selves (themselves)
 * 
 * Source: LanguageTool (THEM_SELVES)
 * Category: grammar
 */
export const themSelvesRule: GrammarRule = {
  id: 'them-selves',
  name: 'them selves (themselves)',
  description: 'Did you mean themselves?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthem\b\s+\bselves\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean themselves?',
        suggestions: ["themselves"],
      });
    }
    
    return issues;
  },
};
