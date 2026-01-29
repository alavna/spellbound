import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * home seeker (homeseeker)
 * 
 * Source: LanguageTool (SEEKER_COMPOUNDS)
 * Category: grammar
 */
export const seekerCompoundsRule: GrammarRule = {
  id: 'seeker-compounds',
  name: 'home seeker (homeseeker)',
  description: 'The noun \\1\\2 is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Hh]ome|[Ss]un|[Jj]ob\b\s+\bseekers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\1\\2 is spelled as one word.',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
