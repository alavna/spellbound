import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * going one (on)
 * 
 * Source: LanguageTool (GOING_ONE)
 * Category: grammar
 */
export const goingOneRule: GrammarRule = {
  id: 'going-one',
  name: 'going one (on)',
  description: 'Did you mean on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat\b\s+\byes\b\s+\bgoing\b\s+\bone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on?',
        suggestions: ["on"],
      });
    }
    
    return issues;
  },
};
