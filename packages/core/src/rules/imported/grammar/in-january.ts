import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in January 1 (on January 1)
 * 
 * Source: LanguageTool (IN_JANUARY)
 * Category: grammar
 */
export const inJanuaryRule: GrammarRule = {
  id: 'in-january',
  name: 'in January 1 (on January 1)',
  description: 'Did you mean on \\2? This seems to be a day date.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+&months;/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on \\2? This seems to be a day date.',
        suggestions: ["on \\2"],
      });
    }
    
    return issues;
  },
};
