import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Phillips (Philips) Arena
 * 
 * Source: LanguageTool (PHILLIPS_ARENA)
 * Category: grammar
 */
export const phillipsArenaRule: GrammarRule = {
  id: 'phillips-arena',
  name: 'Phillips (Philips) Arena',
  description: 'Did you mean Philips Arena?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPhillips\b\s+\bArena\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Philips Arena?',
        suggestions: ["Philips Arena"],
      });
    }
    
    return issues;
  },
};
