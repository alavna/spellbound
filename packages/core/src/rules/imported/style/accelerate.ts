import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accelerate
 * 
 * Source: LanguageTool (ACCELERATE)
 * Category: style
 */
export const accelerateRule: GrammarRule = {
  id: 'accelerate',
  name: 'accelerate',
  description: 'Technical. Elsewhere replace with speed up.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Technical. Elsewhere replace with speed up.',
        suggestions: ["speed up"],
      });
    }
    
    return issues;
  },
};
