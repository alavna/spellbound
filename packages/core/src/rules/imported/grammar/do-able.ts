import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Do able (Doable)
 * 
 * Source: LanguageTool (DO_ABLE)
 * Category: grammar
 */
export const doAbleRule: GrammarRule = {
  id: 'do-able',
  name: 'Do able (Doable)',
  description: 'Did you mean the adjective doable?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo\b\s+\bable\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective doable?',
        suggestions: ["doable"],
      });
    }
    
    return issues;
  },
};
