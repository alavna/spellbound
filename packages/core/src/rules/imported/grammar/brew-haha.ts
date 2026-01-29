import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * brew haha (brouhaha)
 * 
 * Source: LanguageTool (BREW_HAHA)
 * Category: grammar
 */
export const brewHahaRule: GrammarRule = {
  id: 'brew-haha',
  name: 'brew haha (brouhaha)',
  description: 'Did you mean brouhaha?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbrew\b\s+\bhaha\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean brouhaha?',
        suggestions: ["brouhaha"],
      });
    }
    
    return issues;
  },
};
