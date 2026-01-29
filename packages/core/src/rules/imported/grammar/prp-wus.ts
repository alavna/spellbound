import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he wos (was)
 * 
 * Source: LanguageTool (PRP_WUS)
 * Category: grammar
 */
export const prpWusRule: GrammarRule = {
  id: 'prp-wus',
  name: 'he wos (was)',
  description: 'Did you mean was?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bw[ou]s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean was?',
        suggestions: ["was"],
      });
    }
    
    return issues;
  },
};
