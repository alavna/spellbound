import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * what it (is) the
 * 
 * Source: LanguageTool (WHAT_IT_THE)
 * Category: grammar
 */
export const whatItTheRule: GrammarRule = {
  id: 'what-it-the',
  name: 'what it (is) the',
  description: 'Did you mean is?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat|when|how|who|where|which\b\s+\bit\b\s+\bthe|an?|my|her|y?our|his|their\b/gi;
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
