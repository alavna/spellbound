import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * play ground (playground)
 * 
 * Source: LanguageTool (PLAY_COMPOUNDS)
 * Category: grammar
 */
export const playCompoundsRule: GrammarRule = {
  id: 'play-compounds',
  name: 'play ground (playground)',
  description: 'Did you mean the noun play?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplay\b\s+\bgrounds?|fields?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun play?',
        suggestions: ["play"],
      });
    }
    
    return issues;
  },
};
