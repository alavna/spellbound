import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * de jure (du jour)
 * 
 * Source: LanguageTool (DE_JURE_DU_JOUR)
 * Category: grammar
 */
export const deJureDuJourRule: GrammarRule = {
  id: 'de-jure-du-jour',
  name: 'de jure (du jour)',
  description: '\'\\1 \\2\' is a legal term. Did you mean du jour or more simply of the day?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsoup|topic|issue|fashion|buzzword\b\s+\bde\b\s+\bjure\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2\' is a legal term. Did you mean du jour or more simply of the day?',
        suggestions: ["du jour","of the day"],
      });
    }
    
    return issues;
  },
};
