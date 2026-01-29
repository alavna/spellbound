import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * legal term: informations
 * 
 * Source: LanguageTool (INFORMATIONS)
 * Category: grammar
 */
export const informationsRule: GrammarRule = {
  id: 'informations',
  name: 'legal term: informations',
  description: 'The word \'\\1\' is a legal term. In standard English, the word \'information\' is a non-count noun.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\binformations\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\1\' is a legal term. In standard English, the word \'information\' is a non-count noun.',
        suggestions: ["information"],
      });
    }
    
    return issues;
  },
};
