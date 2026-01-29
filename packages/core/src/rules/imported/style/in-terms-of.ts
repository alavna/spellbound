import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in terms of (in, for)
 * 
 * Source: LanguageTool (IN_TERMS_OF)
 * Category: style
 */
export const inTermsOfRule: GrammarRule = {
  id: 'in-terms-of',
  name: 'in terms of (in, for)',
  description: 'Change to in or for.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bterms\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Change to in or for.',
        suggestions: ["in","for"],
      });
    }
    
    return issues;
  },
};
