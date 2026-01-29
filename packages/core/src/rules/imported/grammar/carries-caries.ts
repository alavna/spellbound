import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * carries vs caries
 * 
 * Source: LanguageTool (CARRIES_CARIES)
 * Category: grammar
 */
export const carriesCariesRule: GrammarRule = {
  id: 'carries-caries',
  name: 'carries vs caries',
  description: 'Did you mean the verb carries (\"to carry\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bcaries|carrys\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb carries (\"to carry\")?',
        suggestions: ["carries"],
      });
    }
    
    return issues;
  },
};
