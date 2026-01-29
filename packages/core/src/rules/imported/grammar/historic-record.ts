import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * historic (historical) record
 * 
 * Source: LanguageTool (HISTORIC_RECORD)
 * Category: grammar
 */
export const historicRecordRule: GrammarRule = {
  id: 'historic-record',
  name: 'historic (historical) record',
  description: 'Did you mean historical record?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhistoric\b\s+\brecord\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean historical record?',
        suggestions: ["historical record"],
      });
    }
    
    return issues;
  },
};
