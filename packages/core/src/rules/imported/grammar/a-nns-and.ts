import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * But when I write, I like to use a pens (a pen|pens) and paper
 * 
 * Source: LanguageTool (A_NNS_AND)
 * Category: grammar
 */
export const aNnsAndRule: GrammarRule = {
  id: 'a-nns-and',
  name: 'But when I write, I like to use a pens (a pen|pens) and paper',
  description: 'The plural noun \'\\2\' cannot follow the article \'\\1\'. Did you mean to use the singular form?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+.+s\b\s+\band\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The plural noun \'\\2\' cannot follow the article \'\\1\'. Did you mean to use the singular form?',
        suggestions: ["\\1","\\2"],
      });
    }
    
    return issues;
  },
};
