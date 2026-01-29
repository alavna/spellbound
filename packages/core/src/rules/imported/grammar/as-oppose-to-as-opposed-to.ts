import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as oppose to (as opposed to)
 * 
 * Source: LanguageTool (AS_OPPOSE_TO_AS_OPPOSED_TO)
 * Category: grammar
 */
export const asOpposeToAsOpposedToRule: GrammarRule = {
  id: 'as-oppose-to-as-opposed-to',
  name: 'as oppose to (as opposed to)',
  description: 'Did you mean the common phrase/idiom as opposed to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\boppose\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the common phrase/idiom as opposed to?',
        suggestions: ["as opposed to"],
      });
    }
    
    return issues;
  },
};
