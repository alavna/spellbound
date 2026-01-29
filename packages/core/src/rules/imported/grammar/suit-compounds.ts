import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * swim suit (swimsuit)
 * 
 * Source: LanguageTool (SUIT_COMPOUNDS)
 * Category: grammar
 */
export const suitCompoundsRule: GrammarRule = {
  id: 'suit-compounds',
  name: 'swim suit (swimsuit)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blaw|body|swim|jump|counter|track|pant|snow|pur|cat|sun|wet\b\s+\bsuite?s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
