import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * established fact (fact)
 * 
 * Source: LanguageTool (ESTABLISHED_FACT)
 * Category: style
 */
export const establishedFactRule: GrammarRule = {
  id: 'established-fact',
  name: 'established fact (fact)',
  description: 'Consider using .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban\b\s+\bestablished\b\s+\bfact\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
