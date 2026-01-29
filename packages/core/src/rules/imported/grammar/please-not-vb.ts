import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * please not do this (please don't do this)
 * 
 * Source: LanguageTool (PLEASE_NOT_VB)
 * Category: grammar
 */
export const pleaseNotVbRule: GrammarRule = {
  id: 'please-not-vb',
  name: 'please not do this (please don\'t do this)',
  description: 'Consider using the negated verb form of \"do\" here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bplease\b\s+\bnot?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the negated verb form of \"do\" here.',
        suggestions: ["don't \\4 \\5"],
      });
    }
    
    return issues;
  },
};
