import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I personal (personally)
 * 
 * Source: LanguageTool (I_PERSONAL)
 * Category: grammar
 */
export const iPersonalRule: GrammarRule = {
  id: 'i-personal',
  name: 'I personal (personally)',
  description: 'Did you mean the adverb \'personally\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI\b\s+\bpersonal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb \'personally\'?',
        suggestions: ["I personally"],
      });
    }
    
    return issues;
  },
};
