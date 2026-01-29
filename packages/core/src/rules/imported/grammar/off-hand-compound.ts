import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * off hand (offhand)
 * 
 * Source: LanguageTool (OFF_HAND_COMPOUND)
 * Category: grammar
 */
export const offHandCompoundRule: GrammarRule = {
  id: 'off-hand-compound',
  name: 'off hand (offhand)',
  description: 'The adjective or adverb off is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boff\b\s+\bhand(ed)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective or adverb off is spelled as one word.',
        suggestions: ["off"],
      });
    }
    
    return issues;
  },
};
