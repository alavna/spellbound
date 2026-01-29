import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * and so one (on)
 * 
 * Source: LanguageTool (AND_SO_ONE)
 * Category: grammar
 */
export const andSoOneRule: GrammarRule = {
  id: 'and-so-one',
  name: 'and so one (on)',
  description: 'Did you mean and so on (=\'etc.\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\band\b\s+\bso\b\s+\bone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean and so on (=\'etc.\')?',
        suggestions: ["and so on"],
      });
    }
    
    return issues;
  },
};
