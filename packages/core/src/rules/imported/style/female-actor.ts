import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * female actor (actress)
 * 
 * Source: LanguageTool (FEMALE_ACTOR)
 * Category: style
 */
export const femaleActorRule: GrammarRule = {
  id: 'female-actor',
  name: 'female actor (actress)',
  description: 'Consider using actress.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfemale|wom[ae]n\b\s+\bactor|actress\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using actress.',
        suggestions: ["actress"],
      });
    }
    
    return issues;
  },
};
