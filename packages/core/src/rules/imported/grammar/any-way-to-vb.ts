import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Is there anyway (any way) to change this?
 * 
 * Source: LanguageTool (ANY_WAY_TO_VB)
 * Category: grammar
 */
export const anyWayToVbRule: GrammarRule = {
  id: 'any-way-to-vb',
  name: 'Is there anyway (any way) to change this?',
  description: 'Instead of the adverb, did you mean to write \'any way\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banyway\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Instead of the adverb, did you mean to write \'any way\'?',
        suggestions: ["any way"],
      });
    }
    
    return issues;
  },
};
