import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it is (a) pleasure to
 * 
 * Source: LanguageTool (IS_PLEASURE_TO)
 * Category: grammar
 */
export const isPleasureToRule: GrammarRule = {
  id: 'is-pleasure-to',
  name: 'it is (a) pleasure to',
  description: 'It appears that an article is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bpleasure\b\s+\bto\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing.',
        suggestions: ["a \\2"],
      });
    }
    
    return issues;
  },
};
