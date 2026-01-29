import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * require typographical (curly) apostrophe (’)
 * 
 * Source: LanguageTool (TYPOGRAPHICAL_APOSTROPHE)
 * Category: grammar
 */
export const typographicalApostropheRule: GrammarRule = {
  id: 'typographical-apostrophe',
  name: 'require typographical (curly) apostrophe (’)',
  description: 'Consider using the typographical apostrophe.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'.+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the typographical apostrophe.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
