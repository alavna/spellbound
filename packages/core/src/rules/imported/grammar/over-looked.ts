import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * over looked (overlooked)
 * 
 * Source: LanguageTool (OVER_LOOKED)
 * Category: grammar
 */
export const overLookedRule: GrammarRule = {
  id: 'over-looked',
  name: 'over looked (overlooked)',
  description: 'Did you mean overlooked?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bover\b\s+\blooked\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean overlooked?',
        suggestions: ["overlooked"],
      });
    }
    
    return issues;
  },
};
