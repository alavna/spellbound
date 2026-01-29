import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hep (help / hip)
 * 
 * Source: LanguageTool (HEP)
 * Category: grammar
 */
export const hepRule: GrammarRule = {
  id: 'hep',
  name: 'hep (help / hip)',
  description: 'Did you mean or (\"hep\" is old-fashioned for \"hip\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Hh]eps?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean or (\"hep\" is old-fashioned for \"hip\")?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
