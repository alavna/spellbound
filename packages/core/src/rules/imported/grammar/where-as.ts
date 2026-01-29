import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * where as/by (whereas/whereby)
 * 
 * Source: LanguageTool (WHERE_AS)
 * Category: grammar
 */
export const whereAsRule: GrammarRule = {
  id: 'where-as',
  name: 'where as/by (whereas/whereby)',
  description: 'Did you mean \\1\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhere\b\s+\bas|by|upon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2?',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
