import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Incorrect possessive form after a number
 * 
 * Source: LanguageTool (INCORRECT_POSSESSIVE_FORM_AFTER_A_NUMBER)
 * Category: grammar
 */
export const incorrectPossessiveFormAfterANumberRule: GrammarRule = {
  id: 'incorrect-possessive-form-after-a-number',
  name: 'Incorrect possessive form after a number',
  description: 'Incorrect singular possessive form after the number (\\1). Did you mean s or s\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Incorrect singular possessive form after the number (\\1). Did you mean s or s\'?',
        suggestions: ["s","s'"],
      });
    }
    
    return issues;
  },
};
