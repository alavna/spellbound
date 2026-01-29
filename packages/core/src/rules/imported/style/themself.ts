import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'themself'
 * 
 * Source: LanguageTool (THEMSELF)
 * Category: style
 */
export const themselfRule: GrammarRule = {
  id: 'themself',
  name: '\'themself\'',
  description: 'Generally speaking, \"themself\" is only acceptable when referring to a singular entity (such as the singular usage of \"they\", which is the preferred pronoun for many non-binary people). If \"themself\" refers to a plural entity (such as \"everybody\", or the standard usage of \"they\"), you should use \"themselves\".',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthemself\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Generally speaking, \"themself\" is only acceptable when referring to a singular entity (such as the singular usage of \"they\", which is the preferred pronoun for many non-binary people). If \"themself\" refers to a plural entity (such as \"everybody\", or the standard usage of \"they\"), you should use \"themselves\".',
        suggestions: ["themselves","himself","herself"],
      });
    }
    
    return issues;
  },
};
