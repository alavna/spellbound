import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hundreds of thousand (thousands of) users
 * 
 * Source: LanguageTool (HUNDREDS_OF_THOUSAND)
 * Category: grammar
 */
export const hundredsOfThousandRule: GrammarRule = {
  id: 'hundreds-of-thousand',
  name: 'hundreds of thousand (thousands of) users',
  description: 'To describe a large number approximately, write \\1 \\2 thousands of.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btens|hundreds\b\s+\bof\b\s+\bthousand\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'To describe a large number approximately, write \\1 \\2 thousands of.',
        suggestions: ["\\1 \\2 thousands of"],
      });
    }
    
    return issues;
  },
};
