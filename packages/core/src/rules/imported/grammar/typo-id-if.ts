import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I want to know id (if) you'll be there
 * 
 * Source: LanguageTool (TYPO_ID_IF)
 * Category: grammar
 */
export const typoIdIfRule: GrammarRule = {
  id: 'typo-id-if',
  name: 'I want to know id (if) you\'ll be there',
  description: 'Did you mean to write \'if\' instead of \'id\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \'if\' instead of \'id\'?',
        suggestions: ["if"],
      });
    }
    
    return issues;
  },
};
