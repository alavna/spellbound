import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * key note (keynote)
 * 
 * Source: LanguageTool (NOTE_COMPOUNDS)
 * Category: grammar
 */
export const noteCompoundsRule: GrammarRule = {
  id: 'note-compounds',
  name: 'key note (keynote)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfoot|key|bank|head|fist\b\s+\bnotes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
