import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * read only (read-only)
 * 
 * Source: LanguageTool (READ_ONLY_ACCESS_HYPHEN)
 * Category: grammar
 */
export const readOnlyAccessHyphenRule: GrammarRule = {
  id: 'read-only-access-hyphen',
  name: 'read only (read-only)',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bread|write\b\s+\bonly\b\s+\baccess|permssions?|mode\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
