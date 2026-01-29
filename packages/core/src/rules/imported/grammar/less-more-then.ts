import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * less/more ... then (than)
 * 
 * Source: LanguageTool (LESS_MORE_THEN)
 * Category: grammar
 */
export const lessMoreThenRule: GrammarRule = {
  id: 'less-more-then',
  name: 'less/more ... then (than)',
  description: 'Did you mean than?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(less|more)\s+\bthen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean than?',
        suggestions: ["than"],
      });
    }
    
    return issues;
  },
};
