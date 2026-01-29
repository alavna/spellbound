import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * goon (go on)
 * 
 * Source: LanguageTool (GOON)
 * Category: grammar
 */
export const goonRule: GrammarRule = {
  id: 'goon',
  name: 'goon (go on)',
  description: 'Did you mean go on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bgoon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean go on?',
        suggestions: ["go on"],
      });
    }
    
    return issues;
  },
};
