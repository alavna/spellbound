import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Further ado instead of further adieu
 * 
 * Source: LanguageTool (FURTHER_ADIEU)
 * Category: grammar
 */
export const furtherAdieuRule: GrammarRule = {
  id: 'further-adieu',
  name: 'Further ado instead of further adieu',
  description: 'Did you mean further ado?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfurther\b\s+\badieu\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean further ado?',
        suggestions: ["further ado"],
      });
    }
    
    return issues;
  },
};
