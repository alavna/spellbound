import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Did your yoga training was (Was your yoga training) good today?
 * 
 * Source: LanguageTool (DOUBLE_AUX)
 * Category: grammar
 */
export const doubleAuxRule: GrammarRule = {
  id: 'double-aux',
  name: 'Did your yoga training was (Was your yoga training) good today?',
  description: 'This question only requires the auxiliary verb \"\\6\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byes\b\s+\S+\s+\S+\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This question only requires the auxiliary verb \"\\6\".',
        suggestions: ["\\6 \\3 \\4 \\5"],
      });
    }
    
    return issues;
  },
};
