import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Unite Kingdom -> United Kingdom
 * 
 * Source: LanguageTool (UNITE_KINGDOM)
 * Category: grammar
 */
export const uniteKingdomRule: GrammarRule = {
  id: 'unite-kingdom',
  name: 'Unite Kingdom -> United Kingdom',
  description: 'Did you mean United Kingdom?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bunite\b\s+\bkingdom\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean United Kingdom?',
        suggestions: ["United Kingdom"],
      });
    }
    
    return issues;
  },
};
