import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * even thou (though)
 * 
 * Source: LanguageTool (EVEN_THOU)
 * Category: grammar
 */
export const evenThouRule: GrammarRule = {
  id: 'even-thou',
  name: 'even thou (though)',
  description: 'Did you mean though?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beven\b\s+\bthou\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean though?',
        suggestions: ["though"],
      });
    }
    
    return issues;
  },
};
