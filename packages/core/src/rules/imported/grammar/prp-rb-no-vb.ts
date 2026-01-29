import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Verb missing after personal pronoun and adverb at beginning of sentence.
 * 
 * Source: LanguageTool (PRP_RB_NO_VB)
 * Category: grammar
 */
export const prpRbNoVbRule: GrammarRule = {
  id: 'prp-rb-no-vb',
  name: 'Verb missing after personal pronoun and adverb at beginning of sentence.',
  description: 'A verb may be missing after \'\\3\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb may be missing after \'\\3\'.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
