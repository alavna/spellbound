import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * above mentioned
 * 
 * Source: LanguageTool (ABOVE_MENTIONED)
 * Category: grammar
 */
export const aboveMentionedRule: GrammarRule = {
  id: 'above-mentioned',
  name: 'above mentioned',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\babove|below\b\s+\bmentioned\b/gi;
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
