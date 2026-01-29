import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * over looking (overlooking)
 * 
 * Source: LanguageTool (OVER_LOOKING)
 * Category: grammar
 */
export const overLookingRule: GrammarRule = {
  id: 'over-looking',
  name: 'over looking (overlooking)',
  description: 'Did you mean overlooking?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bover\b\s+\blooking\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean overlooking?',
        suggestions: ["overlooking"],
      });
    }
    
    return issues;
  },
};
