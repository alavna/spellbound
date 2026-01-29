import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * possessive case after with(out)/at/in/to/...
 * 
 * Source: LanguageTool (POSSESSIVE_CASE)
 * Category: grammar
 */
export const possessiveCaseRule: GrammarRule = {
  id: 'possessive-case',
  name: 'possessive case after with(out)/at/in/to/...',
  description: 'The possessive form of the pronoun may be required here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat|with(out)?|in|under|about\b\s+[\.…\.?]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The possessive form of the pronoun may be required here.',
        suggestions: ["\\2 my","\\2 her","\\2 his","\\2 our","\\2 their"],
      });
    }
    
    return issues;
  },
};
