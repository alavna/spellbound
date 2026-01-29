import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ringo Starr
 * 
 * Source: LanguageTool (RINGO_STARR)
 * Category: grammar
 */
export const ringoStarrRule: GrammarRule = {
  id: 'ringo-starr',
  name: 'Ringo Starr',
  description: 'Did you mean the Beatles drummer Ringo Starr?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bRingo\b\s+\bStarr?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Beatles drummer Ringo Starr?',
        suggestions: ["Ringo Starr"],
      });
    }
    
    return issues;
  },
};
