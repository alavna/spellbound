import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * They hugged even although (though) they had a fight
 * 
 * Source: LanguageTool (EVEN_ALTHOUGH)
 * Category: grammar
 */
export const evenAlthoughRule: GrammarRule = {
  id: 'even-although',
  name: 'They hugged even although (though) they had a fight',
  description: 'Did you mean to write \'though\' here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beven\b\s+\balthough\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \'though\' here?',
        suggestions: ["though"],
      });
    }
    
    return issues;
  },
};
