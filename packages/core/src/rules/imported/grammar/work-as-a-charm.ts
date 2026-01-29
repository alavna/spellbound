import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * works as (like) a charm
 * 
 * Source: LanguageTool (WORK_AS_A_CHARM)
 * Category: grammar
 */
export const workAsACharmRule: GrammarRule = {
  id: 'work-as-a-charm',
  name: 'works as (like) a charm',
  description: 'The word \'\\2\' is correct if it refers to the function or character of someone or something. But, if you mean \'successful\' or \'effective\', use \\1 like \\3 \\4.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bas\b\s+\ba\b\s+\bcharm\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\2\' is correct if it refers to the function or character of someone or something. But, if you mean \'successful\' or \'effective\', use \\1 like \\3 \\4.',
        suggestions: ["\\1 like \\3 \\4"],
      });
    }
    
    return issues;
  },
};
