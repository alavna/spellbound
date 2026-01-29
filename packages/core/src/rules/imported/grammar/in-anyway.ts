import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in anyway (any way)
 * 
 * Source: LanguageTool (IN_ANYWAY)
 * Category: grammar
 */
export const inAnywayRule: GrammarRule = {
  id: 'in-anyway',
  name: 'in anyway (any way)',
  description: 'Did you mean in any way?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\banyway\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in any way?',
        suggestions: ["in any way"],
      });
    }
    
    return issues;
  },
};
