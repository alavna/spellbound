import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Assassin's Creed
 * 
 * Source: LanguageTool (ASSASSINS_CREED)
 * Category: grammar
 */
export const assassinsCreedRule: GrammarRule = {
  id: 'assassins-creed',
  name: 'Assassin\'s Creed',
  description: 'Did you mean Assassin\'s Creed (= video game)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bass?ass?ins?\s+\bcreed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Assassin\'s Creed (= video game)?',
        suggestions: ["Assassin's Creed"],
      });
    }
    
    return issues;
  },
};
