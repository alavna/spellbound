import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Red-Nosed Reindeer
 * 
 * Source: LanguageTool (RED_NOSED_REINDEER)
 * Category: grammar
 */
export const redNosedReindeerRule: GrammarRule = {
  id: 'red-nosed-reindeer',
  name: 'Red-Nosed Reindeer',
  description: 'Did you mean - (Rudolph)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bred\b\s+\bnosed?\s+\br.indee?rs?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean - (Rudolph)?',
        suggestions: ["-"],
      });
    }
    
    return issues;
  },
};
