import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'kind/type/sort of a/an'
 * 
 * Source: LanguageTool (KIND_OF_A)
 * Category: grammar
 */
export const kindOfARule: GrammarRule = {
  id: 'kind-of-a',
  name: '\'kind/type/sort of a/an\'',
  description: 'If \'\\1\' is a classification term, \'\\3\' is not necessary. Use \\1 \\2. (The phrases \'kind of\' and \'sort of\' are informal if they mean \'to some extent\'.)',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bkind|sort|type\b\s+\bof\b\s+\ban?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If \'\\1\' is a classification term, \'\\3\' is not necessary. Use \\1 \\2. (The phrases \'kind of\' and \'sort of\' are informal if they mean \'to some extent\'.)',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
