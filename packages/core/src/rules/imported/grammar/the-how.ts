import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the how/why (how/why)
 * 
 * Source: LanguageTool (THE_HOW)
 * Category: grammar
 */
export const theHowRule: GrammarRule = {
  id: 'the-how',
  name: 'the how/why (how/why)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: false, // DISABLED: Broken import - pattern lost during conversion

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
