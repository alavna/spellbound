import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he dint (didn't)
 * 
 * Source: LanguageTool (PRP_DINT)
 * Category: grammar
 */
export const prpDintRule: GrammarRule = {
  id: 'prp-dint',
  name: 'he dint (didn\'t)',
  description: 'Did you mean didn\'t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|we|they|it\b\s+\bdint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean didn\'t?',
        suggestions: ["didn't"],
      });
    }
    
    return issues;
  },
};
