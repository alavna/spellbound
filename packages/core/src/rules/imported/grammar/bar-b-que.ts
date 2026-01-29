import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bar-b-queue instead of 'bar-b-que'
 * 
 * Source: LanguageTool (BAR_B_QUE)
 * Category: grammar
 */
export const barBQueRule: GrammarRule = {
  id: 'bar-b-que',
  name: 'bar-b-queue instead of \'bar-b-que\'',
  description: 'Did you mean barbeque or ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbar-b-queues?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean barbeque or ?',
        suggestions: ["barbeque"],
      });
    }
    
    return issues;
  },
};
