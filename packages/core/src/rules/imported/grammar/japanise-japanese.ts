import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Japanise vs Japanese
 * 
 * Source: LanguageTool (JAPANISE_JAPANESE)
 * Category: grammar
 */
export const japaniseJapaneseRule: GrammarRule = {
  id: 'japanise-japanese',
  name: 'Japanise vs Japanese',
  description: 'Did you mean Japanese (= people from Japan)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bjapanise\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Japanese (= people from Japan)?',
        suggestions: ["Japanese"],
      });
    }
    
    return issues;
  },
};
