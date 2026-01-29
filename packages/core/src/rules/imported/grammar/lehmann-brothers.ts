import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Lehman Brothers
 * 
 * Source: LanguageTool (LEHMANN_BROTHERS)
 * Category: grammar
 */
export const lehmannBrothersRule: GrammarRule = {
  id: 'lehmann-brothers',
  name: 'Lehman Brothers',
  description: 'Did you mean Lehman ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bLehmann?\s+\bBrothers|College\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Lehman ?',
        suggestions: ["Lehman"],
      });
    }
    
    return issues;
  },
};
