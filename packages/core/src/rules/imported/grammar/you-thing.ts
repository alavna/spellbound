import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I/you/... thing (think)
 * 
 * Source: LanguageTool (YOU_THING)
 * Category: grammar
 */
export const youThingRule: GrammarRule = {
  id: 'you-thing',
  name: 'I/you/... thing (think)',
  description: 'Did you mean think or thinks?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|they|we\b\s+\bthings?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean think or thinks?',
        suggestions: ["think","thinks"],
      });
    }
    
    return issues;
  },
};
