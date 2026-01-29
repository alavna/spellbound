import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he delt (dealt)
 * 
 * Source: LanguageTool (PRP_DELT)
 * Category: grammar
 */
export const prpDeltRule: GrammarRule = {
  id: 'prp-delt',
  name: 'he delt (dealt)',
  description: 'Did you mean dealt (past tense of \'to deal\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|we|they|it\b\s+\S+\s+\bdelt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean dealt (past tense of \'to deal\')?',
        suggestions: ["dealt"],
      });
    }
    
    return issues;
  },
};
