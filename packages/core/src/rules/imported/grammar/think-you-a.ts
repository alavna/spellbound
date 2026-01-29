import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * think you a/an (are)
 * 
 * Source: LanguageTool (THINK_YOU_A)
 * Category: grammar
 */
export const thinkYouARule: GrammarRule = {
  id: 'think-you-a',
  name: 'think you a/an (are)',
  description: 'Did you mean are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bth(inks?|ought)\s+\byou\b\s+\ban?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean are?',
        suggestions: ["are"],
      });
    }
    
    return issues;
  },
};
