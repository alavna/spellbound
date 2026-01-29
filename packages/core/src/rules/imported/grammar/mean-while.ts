import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mean while (meanwhile)
 * 
 * Source: LanguageTool (MEAN_WHILE)
 * Category: grammar
 */
export const meanWhileRule: GrammarRule = {
  id: 'mean-while',
  name: 'mean while (meanwhile)',
  description: 'Did you mean meanwhile?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmean\b\s+\bwhile\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean meanwhile?',
        suggestions: ["meanwhile"],
      });
    }
    
    return issues;
  },
};
