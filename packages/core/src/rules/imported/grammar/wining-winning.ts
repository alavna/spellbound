import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wining vs winning
 * 
 * Source: LanguageTool (WINING_WINNING)
 * Category: grammar
 */
export const winingWinningRule: GrammarRule = {
  id: 'wining-winning',
  name: 'wining vs winning',
  description: 'Did you mean winning (= to win the championship) or whining (= to cry)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwining\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean winning (= to win the championship) or whining (= to cry)?',
        suggestions: ["winning","whining"],
      });
    }
    
    return issues;
  },
};
