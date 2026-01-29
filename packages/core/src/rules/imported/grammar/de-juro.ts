import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * de juro (jure)
 * 
 * Source: LanguageTool (DE_JURO)
 * Category: grammar
 */
export const deJuroRule: GrammarRule = {
  id: 'de-juro',
  name: 'de juro (jure)',
  description: 'This is an incorrect spelling of a Latin phrase. Did you mean de jure (according to law)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bde\b\s+\bjuro\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is an incorrect spelling of a Latin phrase. Did you mean de jure (according to law)?',
        suggestions: ["de jure"],
      });
    }
    
    return issues;
  },
};
