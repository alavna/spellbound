import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * what it (is) happening
 * 
 * Source: LanguageTool (WHAT_IT_HAPPENING)
 * Category: grammar
 */
export const whatItHappeningRule: GrammarRule = {
  id: 'what-it-happening',
  name: 'what it (is) happening',
  description: 'Did you mean is?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwhat\b\s+\bit\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean is?',
        suggestions: ["is"],
      });
    }
    
    return issues;
  },
};
