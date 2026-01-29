import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hand cuff (handcuff)
 * 
 * Source: LanguageTool (HAND_CUFF_COMPOUND)
 * Category: grammar
 */
export const handCuffCompoundRule: GrammarRule = {
  id: 'hand-cuff-compound',
  name: 'hand cuff (handcuff)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhand\b\s+\bcuff(ed|s|ing)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["hand"],
      });
    }
    
    return issues;
  },
};
