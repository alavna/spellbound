import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Air Bnb (Airbnb)
 * 
 * Source: LanguageTool (AIR_BNB)
 * Category: grammar
 */
export const airBnbRule: GrammarRule = {
  id: 'air-bnb',
  name: 'Air Bnb (Airbnb)',
  description: 'The name of this online marketplace is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bAir\b\s+\bBnb\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this online marketplace is spelled as one word.',
        suggestions: ["Airbnb"],
      });
    }
    
    return issues;
  },
};
