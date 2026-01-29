import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for all intents and purposes (omit)
 * 
 * Source: LanguageTool (FOR_ALL_INTENTS_AND_PURPOSES)
 * Category: style
 */
export const forAllIntentsAndPurposesRule: GrammarRule = {
  id: 'for-all-intents-and-purposes',
  name: 'for all intents and purposes (omit)',
  description: 'See if you could remove this phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\ball\b\s+\bintents\b\s+\band\b\s+\bpurposes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'See if you could remove this phrase.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
