import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * with/in reference to, with/in regard to (about, of, on, for, concerning, regarding)
 * 
 * Source: LanguageTool (WITH_OR_IN_REFERENCE_OR_REGARD_TO)
 * Category: style
 */
export const withOrInReferenceOrRegardToRule: GrammarRule = {
  id: 'with-or-in-reference-or-regard-to',
  name: 'with/in reference to, with/in regard to (about, of, on, for, concerning, regarding)',
  description: 'Replace with shorter about, of, on, for, concerning, or regarding.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwith|in\b\s+\breference|regard\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Replace with shorter about, of, on, for, concerning, or regarding.',
        suggestions: ["about","of","on","for","concerning","regarding"],
      });
    }
    
    return issues;
  },
};
