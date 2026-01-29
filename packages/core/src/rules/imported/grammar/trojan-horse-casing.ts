import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * trojan (Trojan) horse
 * 
 * Source: LanguageTool (TROJAN_HORSE_CASING)
 * Category: grammar
 */
export const trojanHorseCasingRule: GrammarRule = {
  id: 'trojan-horse-casing',
  name: 'trojan (Trojan) horse',
  description: 'Trojan refers to a proper noun and needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btrojan\b\s+\bhorses?|virus(es)?|asteroids?|points?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Trojan refers to a proper noun and needs to be capitalized.',
        suggestions: ["Trojan"],
      });
    }
    
    return issues;
  },
};
