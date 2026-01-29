import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Take it personal (personally)
 * 
 * Source: LanguageTool (TAKE_IT_PERSONAL)
 * Category: grammar
 */
export const takeItPersonalRule: GrammarRule = {
  id: 'take-it-personal',
  name: 'Take it personal (personally)',
  description: 'It seems that the adverb personally should be used here (as in the expression \"Don\'t take it personally!\").',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bit\b\s+\bpersonal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that the adverb personally should be used here (as in the expression \"Don\'t take it personally!\").',
        suggestions: ["personally"],
      });
    }
    
    return issues;
  },
};
