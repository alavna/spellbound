import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * way side (wayside)
 * 
 * Source: LanguageTool (WAY_SIDE)
 * Category: grammar
 */
export const waySideRule: GrammarRule = {
  id: 'way-side',
  name: 'way side (wayside)',
  description: 'Did you mean wayside?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bway\b\s+\bside\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wayside?',
        suggestions: ["wayside"],
      });
    }
    
    return issues;
  },
};
