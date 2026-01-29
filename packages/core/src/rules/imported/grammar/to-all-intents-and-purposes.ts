import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all intensive purposes (all intents and purposes)
 * 
 * Source: LanguageTool (TO_ALL_INTENTS_AND_PURPOSES)
 * Category: grammar
 */
export const toAllIntentsAndPurposesRule: GrammarRule = {
  id: 'to-all-intents-and-purposes',
  name: 'all intensive purposes (all intents and purposes)',
  description: 'Did you confuse this with the common idiom: \\1 \\2 intents and \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor|to\b\s+\ball\b\s+\bintensive\b\s+\bpurposes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you confuse this with the common idiom: \\1 \\2 intents and \\4?',
        suggestions: ["\\1 \\2 intents and \\4"],
      });
    }
    
    return issues;
  },
};
