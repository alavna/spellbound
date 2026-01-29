import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'written in verses (verse)'
 * 
 * Source: LanguageTool (VERSE)
 * Category: grammar
 */
export const verseRule: GrammarRule = {
  id: 'verse',
  name: '\'written in verses (verse)\'',
  description: 'Did you mean verse?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bin\b\s+\bverses\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean verse?',
        suggestions: ["verse"],
      });
    }
    
    return issues;
  },
};
