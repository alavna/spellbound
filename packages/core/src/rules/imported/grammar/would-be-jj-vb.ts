import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It would be great (to) write
 * 
 * Source: LanguageTool (WOULD_BE_JJ_VB)
 * Category: grammar
 */
export const wouldBeJjVbRule: GrammarRule = {
  id: 'would-be-jj-vb',
  name: 'It would be great (to) write',
  description: 'The infinitive \"\\4\" after \"be\" requires \"to\". Did you mean \\2 \\3 to \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The infinitive \"\\4\" after \"be\" requires \"to\". Did you mean \\2 \\3 to \\4?',
        suggestions: ["\\2 \\3 to \\4"],
      });
    }
    
    return issues;
  },
};
