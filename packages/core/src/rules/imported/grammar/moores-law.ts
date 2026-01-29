import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Moore's Law
 * 
 * Source: LanguageTool (MOORES_LAW)
 * Category: grammar
 */
export const mooresLawRule: GrammarRule = {
  id: 'moores-law',
  name: 'Moore\'s Law',
  description: 'Did you mean Moore\'s \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmoo?res\b\s+\blaw\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Moore\'s \\2?',
        suggestions: ["Moore's \\2"],
      });
    }
    
    return issues;
  },
};
