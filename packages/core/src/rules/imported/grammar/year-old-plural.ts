import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * She turned 25 year (years) old.
 * 
 * Source: LanguageTool (YEAR_OLD_PLURAL)
 * Category: grammar
 */
export const yearOldPluralRule: GrammarRule = {
  id: 'year-old-plural',
  name: 'She turned 25 year (years) old.',
  description: 'Did you mean \\2 years?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\byear\b\s+\bold|young\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2 years?',
        suggestions: ["\\2 years"],
      });
    }
    
    return issues;
  },
};
