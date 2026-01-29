import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Fall is among (upon) us
 * 
 * Source: LanguageTool (FALL_IS_AMONG)
 * Category: grammar
 */
export const fallIsAmongRule: GrammarRule = {
  id: 'fall-is-among',
  name: 'Fall is among (upon) us',
  description: 'Incorrect preposition detected.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwinter|spring|summer|fall|autumn\b\s+'s|is|are\b\s+\bamong\b\s+\bus\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Incorrect preposition detected.',
        suggestions: ["upon"],
      });
    }
    
    return issues;
  },
};
