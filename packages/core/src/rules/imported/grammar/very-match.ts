import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * very match (much)
 * 
 * Source: LanguageTool (VERY_MATCH)
 * Category: grammar
 */
export const veryMatchRule: GrammarRule = {
  id: 'very-match',
  name: 'very match (much)',
  description: 'Did you mean very much?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou\b\s+\bvery\b\s+\bmatch\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean very much?',
        suggestions: ["very much"],
      });
    }
    
    return issues;
  },
};
