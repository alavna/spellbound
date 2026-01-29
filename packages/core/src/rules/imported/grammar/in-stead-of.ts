import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in stead of (instead of)
 * 
 * Source: LanguageTool (IN_STEAD_OF)
 * Category: grammar
 */
export const inSteadOfRule: GrammarRule = {
  id: 'in-stead-of',
  name: 'in stead of (instead of)',
  description: 'Did you mean \\1\\2 \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bstead\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2 \\3?',
        suggestions: ["\\1\\2 \\3"],
      });
    }
    
    return issues;
  },
};
