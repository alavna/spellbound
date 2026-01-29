import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * down side (downside)
 * 
 * Source: LanguageTool (DOWN_SIDE)
 * Category: grammar
 */
export const downSideRule: GrammarRule = {
  id: 'down-side',
  name: 'down side (downside)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdown|up\b\s+\bsides?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
