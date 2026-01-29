import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * some where (somewhere)
 * 
 * Source: LanguageTool (SOME_WHERE)
 * Category: grammar
 */
export const someWhereRule: GrammarRule = {
  id: 'some-where',
  name: 'some where (somewhere)',
  description: 'Did you mean somewhere?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome\b\s+\bwhere\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean somewhere?',
        suggestions: ["somewhere"],
      });
    }
    
    return issues;
  },
};
