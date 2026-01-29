import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Lmk if that fits your schedule ass (as) well
 * 
 * Source: LanguageTool (TYPO_AS_S_AS)
 * Category: grammar
 */
export const typoAsSAsRule: GrammarRule = {
  id: 'typo-as-s-as',
  name: 'Lmk if that fits your schedule ass (as) well',
  description: 'Did you mean \"as\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bass\b\s+\bwell\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \"as\"?',
        suggestions: ["as"],
      });
    }
    
    return issues;
  },
};
