import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * head shot (thunderstorm)
 * 
 * Source: LanguageTool (HEAD_COMPOUNDS)
 * Category: grammar
 */
export const headCompoundsRule: GrammarRule = {
  id: 'head-compounds',
  name: 'head shot (thunderstorm)',
  description: 'The word head is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhead\b\s+\bspaces?|shots?|shrinkers?|hunters?|quarters?|masters?|boards?|gear|wear|ships?|winds?|bands?|rooms?|set|lands?|stones?|phones?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word head is spelled as one word.',
        suggestions: ["head"],
      });
    }
    
    return issues;
  },
};
