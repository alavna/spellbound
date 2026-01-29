import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * et all (et al.)
 * 
 * Source: LanguageTool (ET_ALL)
 * Category: grammar
 */
export const etAllRule: GrammarRule = {
  id: 'et-all',
  name: 'et all (et al.)',
  description: 'Did you mean et al. (=and others) or at all?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bet\b\s+\ball\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean et al. (=and others) or at all?',
        suggestions: ["et al.","at all"],
      });
    }
    
    return issues;
  },
};
