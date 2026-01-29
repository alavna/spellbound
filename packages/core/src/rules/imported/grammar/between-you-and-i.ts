import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * between you and I (me)
 * 
 * Source: LanguageTool (BETWEEN_YOU_AND_I)
 * Category: grammar
 */
export const betweenYouAndIRule: GrammarRule = {
  id: 'between-you-and-i',
  name: 'between you and I (me)',
  description: 'Did you mean between you and me?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbetween\b\s+\byou\b\s+\band\b\s+\bI\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean between you and me?',
        suggestions: ["between you and me"],
      });
    }
    
    return issues;
  },
};
