import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * niece (nice) day etc.
 * 
 * Source: LanguageTool (NIECE_NICE)
 * Category: grammar
 */
export const nieceNiceRule: GrammarRule = {
  id: 'niece-nice',
  name: 'niece (nice) day etc.',
  description: 'Did you mean nice (=pleasant)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bniece\b\s+\btry|holiday|vacation|day|conference\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean nice (=pleasant)?',
        suggestions: ["nice"],
      });
    }
    
    return issues;
  },
};
