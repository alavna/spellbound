import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * contribution on/to
 * 
 * Source: LanguageTool (ON_THE_NOVEL)
 * Category: grammar
 */
export const onTheNovelRule: GrammarRule = {
  id: 'on-the-novel',
  name: 'contribution on/to',
  description: 'The usual preposition for \"contribution\" is \"to\". Did you mean \\1 to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual preposition for \"contribution\" is \"to\". Did you mean \\1 to?',
        suggestions: ["\\1 to"],
      });
    }
    
    return issues;
  },
};
