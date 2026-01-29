import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * who/that is located in (in)
 * 
 * Source: LanguageTool (IS_LOCATED_IN)
 * Category: style
 */
export const isLocatedInRule: GrammarRule = {
  id: 'is-located-in',
  name: 'who/that is located in (in)',
  description: 'Use in.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwho|that\b\s+\byes\b\s+\blocated\b\s+\bin\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use in.',
        suggestions: ["in"],
      });
    }
    
    return issues;
  },
};
