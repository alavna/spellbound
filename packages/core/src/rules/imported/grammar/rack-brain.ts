import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrack (rack) one's brain about
 * 
 * Source: LanguageTool (RACK_BRAIN)
 * Category: grammar
 */
export const rackBrainRule: GrammarRule = {
  id: 'rack-brain',
  name: 'wrack (rack) one\'s brain about',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bbrain\b/gi;
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
