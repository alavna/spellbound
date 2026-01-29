import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in term (terms) of
 * 
 * Source: LanguageTool (IN_THE_LONG_TERMS)
 * Category: grammar
 */
export const inTheLongTermsRule: GrammarRule = {
  id: 'in-the-long-terms',
  name: 'in term (terms) of',
  description: 'Did you mean the commonly used phrase \\1 \\2 ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\blon?g|short\b\s+(term|run)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the commonly used phrase \\1 \\2 ?',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
