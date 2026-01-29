import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * worth while (worthwhile)
 * 
 * Source: LanguageTool (WORTH_WHILE)
 * Category: grammar
 */
export const worthWhileRule: GrammarRule = {
  id: 'worth-while',
  name: 'worth while (worthwhile)',
  description: 'Did you mean worthwhile?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworth\b\s+\bwhile\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worthwhile?',
        suggestions: ["worthwhile"],
      });
    }
    
    return issues;
  },
};
