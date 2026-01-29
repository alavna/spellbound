import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * proper noun 'Turkey' (country)
 * 
 * Source: LanguageTool (TURKEY)
 * Category: grammar
 */
export const turkeyRule: GrammarRule = {
  id: 'turkey',
  name: 'proper noun \'Turkey\' (country)',
  description: 'Did you mean the country Turkey (which needs to be capitalized)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin|to|from|of|across\b\s+\bturkey\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the country Turkey (which needs to be capitalized)?',
        suggestions: ["Turkey"],
      });
    }
    
    return issues;
  },
};
