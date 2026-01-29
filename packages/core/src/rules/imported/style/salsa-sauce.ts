import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * salsa sauce (salsa)
 * 
 * Source: LanguageTool (SALSA_SAUCE)
 * Category: style
 */
export const salsaSauceRule: GrammarRule = {
  id: 'salsa-sauce',
  name: 'salsa sauce (salsa)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsalsa\b\s+\bsauce\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
