import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * getted (got)
 * 
 * Source: LanguageTool (GETTED)
 * Category: grammar
 */
export const gettedRule: GrammarRule = {
  id: 'getted',
  name: 'getted (got)',
  description: 'Did you mean got or get it?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgetted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean got or get it?',
        suggestions: ["got","get it"],
      });
    }
    
    return issues;
  },
};
