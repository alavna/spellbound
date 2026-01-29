import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * that exists (omit)
 * 
 * Source: LanguageTool (THAT_EXISTS)
 * Category: style
 */
export const thatExistsRule: GrammarRule = {
  id: 'that-exists',
  name: 'that exists (omit)',
  description: 'Try removing the phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat\b\s+\bexists\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try removing the phrase.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
