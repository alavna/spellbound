import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * water resistant (water-resistant)
 * 
 * Source: LanguageTool (RESISTANT_HYPHEN)
 * Category: grammar
 */
export const resistantHyphenRule: GrammarRule = {
  id: 'resistant-hyphen',
  name: 'water resistant (water-resistant)',
  description: 'The adjective \\1-\\2 is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwater|rub|fire|acid|heat\b\s+\bresistant\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
