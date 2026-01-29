import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * originally born in (born in)
 * 
 * Source: LanguageTool (ORIGINALLY_BORN_IN)
 * Category: style
 */
export const originallyBornInRule: GrammarRule = {
  id: 'originally-born-in',
  name: 'originally born in (born in)',
  description: 'Consider using \\2 \\3.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boriginally\b\s+\bborn\b\s+\bin\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2 \\3.',
        suggestions: ["\\2 \\3"],
      });
    }
    
    return issues;
  },
};
