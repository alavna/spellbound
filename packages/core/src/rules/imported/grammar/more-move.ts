import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * more vs move
 * 
 * Source: LanguageTool (MORE_MOVE)
 * Category: grammar
 */
export const moreMoveRule: GrammarRule = {
  id: 'more-move',
  name: 'more vs move',
  description: 'Did you mean the verb move?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmore\b\s+\bit|them|in(to)?|the|my|y?our|his|her|their|at|by|from|out|to\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb move?',
        suggestions: ["move"],
      });
    }
    
    return issues;
  },
};
