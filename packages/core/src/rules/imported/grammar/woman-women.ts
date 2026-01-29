import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one woman, two women
 * 
 * Source: LanguageTool (WOMAN_WOMEN)
 * Category: grammar
 */
export const womanWomenRule: GrammarRule = {
  id: 'woman-women',
  name: 'one woman, two women',
  description: '\'woman\' is the singular form of \'women\'. Consider using woman.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba|one\b\s+\bwomen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'woman\' is the singular form of \'women\'. Consider using woman.',
        suggestions: ["woman"],
      });
    }
    
    return issues;
  },
};
