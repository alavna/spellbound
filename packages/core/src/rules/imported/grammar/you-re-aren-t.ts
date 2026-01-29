import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * you're aren't
 * 
 * Source: LanguageTool (YOU_RE_AREN_T)
 * Category: grammar
 */
export const youReArenTRule: GrammarRule = {
  id: 'you-re-aren-t',
  name: 'you\'re aren\'t',
  description: 'Did you mean \\1\\2 or \\1 \\3\\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|you|we|they\b\s+'re|'s|'m\b\s+\bwas|were|are|is|ai\b\s+\bn't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2 or \\1 \\3\\4?',
        suggestions: ["\\1\\2","\\1 \\3\\4"],
      });
    }
    
    return issues;
  },
};
