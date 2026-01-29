import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * trade mark (trademark)
 * 
 * Source: LanguageTool (MARK_COMPOUNDS)
 * Category: grammar
 */
export const markCompoundsRule: GrammarRule = {
  id: 'mark-compounds',
  name: 'trade mark (trademark)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\breichs|trade|bench|water|birth|metal|press|match|land|hall|book|tele|post|tide|pock|sitz|foot|ear|sea|ost\b\s+\bmarks?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
