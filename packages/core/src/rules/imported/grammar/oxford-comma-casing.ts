import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * oxford (Oxford) comma
 * 
 * Source: LanguageTool (OXFORD_COMMA_CASING)
 * Category: grammar
 */
export const oxfordCommaCasingRule: GrammarRule = {
  id: 'oxford-comma-casing',
  name: 'oxford (Oxford) comma',
  description: 'The name of this dictionary or university needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boxford\b\s+\bcommas?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this dictionary or university needs to be capitalized.',
        suggestions: ["Oxford"],
      });
    }
    
    return issues;
  },
};
