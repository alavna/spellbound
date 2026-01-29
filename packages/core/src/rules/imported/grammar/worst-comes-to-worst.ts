import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * worst (worse) comes to worst
 * 
 * Source: LanguageTool (WORST_COMES_TO_WORST)
 * Category: grammar
 */
export const worstComesToWorstRule: GrammarRule = {
  id: 'worst-comes-to-worst',
  name: 'worst (worse) comes to worst',
  description: 'Did you mean worse comes to worst?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworst\b\s+\bcomes\b\s+\bto\b\s+\bworst\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worse comes to worst?',
        suggestions: ["worse comes to worst"],
      });
    }
    
    return issues;
  },
};
