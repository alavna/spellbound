import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'all the further' is a common, but incorrect phrase
 * 
 * Source: LanguageTool (ALL_THE_FURTHER)
 * Category: grammar
 */
export const allTheFurtherRule: GrammarRule = {
  id: 'all-the-further',
  name: '\'all the further\' is a common, but incorrect phrase',
  description: 'Did you mean as far as?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bthe\b\s+\bfurther\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean as far as?',
        suggestions: ["as far as"],
      });
    }
    
    return issues;
  },
};
