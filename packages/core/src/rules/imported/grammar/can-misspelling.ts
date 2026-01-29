import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It cam (can) happen anytime.
 * 
 * Source: LanguageTool (CAN_MISSPELLING)
 * Category: grammar
 */
export const canMisspellingRule: GrammarRule = {
  id: 'can-misspelling',
  name: 'It cam (can) happen anytime.',
  description: 'Did you mean can?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcam\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean can?',
        suggestions: ["can"],
      });
    }
    
    return issues;
  },
};
