import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it vs si
 * 
 * Source: LanguageTool (IT_SI)
 * Category: grammar
 */
export const itSiRule: GrammarRule = {
  id: 'it-si',
  name: 'it vs si',
  description: 'Did you mean is?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]t|[Ss]he|[Hh]e|[Tt]?[Hh]ere|[Ww]ho|[Ww]here|[Ww]hen|[Ww]hat|[Hh]ow|[Ww]hich\b\s+\bsi\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean is?',
        suggestions: ["is"],
      });
    }
    
    return issues;
  },
};
