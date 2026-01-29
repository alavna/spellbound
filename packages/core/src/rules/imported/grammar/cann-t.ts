import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * cann't → can't
 * 
 * Source: LanguageTool (CANN_T)
 * Category: grammar
 */
export const cannTRule: GrammarRule = {
  id: 'cann-t',
  name: 'cann\'t → can\'t',
  description: 'Typo detected. Did you mean can\\2\\3 or cannot?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcann\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean can\\2\\3 or cannot?',
        suggestions: ["can\\2\\3","cannot"],
      });
    }
    
    return issues;
  },
};
