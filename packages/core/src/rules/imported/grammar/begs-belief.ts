import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * begs (beggars) belief
 * 
 * Source: LanguageTool (BEGS_BELIEF)
 * Category: grammar
 */
export const begsBeliefRule: GrammarRule = {
  id: 'begs-belief',
  name: 'begs (beggars) belief',
  description: 'Did you mean beggars belief?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbegs\b\s+\bbelief\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean beggars belief?',
        suggestions: ["beggars belief"],
      });
    }
    
    return issues;
  },
};
