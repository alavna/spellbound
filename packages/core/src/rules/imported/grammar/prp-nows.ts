import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he nows (knows)
 * 
 * Source: LanguageTool (PRP_NOWS)
 * Category: grammar
 */
export const prpNowsRule: GrammarRule = {
  id: 'prp-nows',
  name: 'he nows (knows)',
  description: 'Did you mean knows (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bnows\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean knows (= verb)?',
        suggestions: ["knows"],
      });
    }
    
    return issues;
  },
};
