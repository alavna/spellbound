import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * very known (very well-known, well-known)
 * 
 * Source: LanguageTool (VERY_KNOWN)
 * Category: grammar
 */
export const veryKnownRule: GrammarRule = {
  id: 'very-known',
  name: 'very known (very well-known, well-known)',
  description: 'Incorrect phrase. Use very well-known or well-known instead.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvery\b\s+\bknown\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Incorrect phrase. Use very well-known or well-known instead.',
        suggestions: ["very well-known","well-known"],
      });
    }
    
    return issues;
  },
};
