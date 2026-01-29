import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mis vs miss
 * 
 * Source: LanguageTool (MIS_MISS)
 * Category: grammar
 */
export const misMissRule: GrammarRule = {
  id: 'mis-miss',
  name: 'mis vs miss',
  description: 'Did you mean the verb miss?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Mm]is\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb miss?',
        suggestions: ["miss"],
      });
    }
    
    return issues;
  },
};
