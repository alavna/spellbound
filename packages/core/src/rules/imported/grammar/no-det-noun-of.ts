import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * IndMys, (a|the) derivative of Alpha-3 code for India and Malaysia...
 * 
 * Source: LanguageTool (NO_DET_NOUN_OF)
 * Category: grammar
 */
export const noDetNounOfRule: GrammarRule = {
  id: 'no-det-noun-of',
  name: 'IndMys, (a|the) derivative of Alpha-3 code for India and Malaysia...',
  description: 'A determiner like \'a\', \'an\', or \'the\' seems to be missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bof\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A determiner like \'a\', \'an\', or \'the\' seems to be missing.',
        suggestions: ["the \\4"],
      });
    }
    
    return issues;
  },
};
