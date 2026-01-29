import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * self fish (selfish)
 * 
 * Source: LanguageTool (SELF_FISH)
 * Category: grammar
 */
export const selfFishRule: GrammarRule = {
  id: 'self-fish',
  name: 'self fish (selfish)',
  description: 'Did you mean the adjective selfish (spelled as one word)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bself\b\s+\bfish\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective selfish (spelled as one word)?',
        suggestions: ["selfish"],
      });
    }
    
    return issues;
  },
};
