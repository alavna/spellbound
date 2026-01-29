import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * If it (it is) ok for you
 * 
 * Source: LanguageTool (IF_IT_OK_FOR)
 * Category: grammar
 */
export const ifItOkForRule: GrammarRule = {
  id: 'if-it-ok-for',
  name: 'If it (it is) ok for you',
  description: 'Did you mean is?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif|whether|when\b\s+\bits?|that|this\b\s+\bok(ay)?|possible|sorry|ready|normal|cool|nice|great|good\b\s+\bfor|to|in|\.|\.|\./gi;
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
