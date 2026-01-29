import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I'm beginning to adding (add)
 * 
 * Source: LanguageTool (BEGINNING_TO_ADDING_NARROW)
 * Category: grammar
 */
export const beginningToAddingNarrowRule: GrammarRule = {
  id: 'beginning-to-adding-narrow',
  name: 'I\'m beginning to adding (add)',
  description: 'After certain verbs like \",\" the verb that follows is usually in the infinitive form. Did you mean to ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bbeginning|starting|trying|attempting|going|planning\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'After certain verbs like \",\" the verb that follows is usually in the infinitive form. Did you mean to ?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
