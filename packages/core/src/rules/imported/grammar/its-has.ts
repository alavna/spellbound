import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It's has (It has)
 * 
 * Source: LanguageTool (ITS_HAS)
 * Category: grammar
 */
export const itsHasRule: GrammarRule = {
  id: 'its-has',
  name: 'It\'s has (It has)',
  description: 'Did you mean has?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]t|[Ss]he|[Hh]e\b\s+'s\b\s+\bhas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean has?',
        suggestions: ["has"],
      });
    }
    
    return issues;
  },
};
