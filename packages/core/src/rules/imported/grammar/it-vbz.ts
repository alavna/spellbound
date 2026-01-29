import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'it' + non-3rd person verb
 * 
 * Source: LanguageTool (IT_VBZ)
 * Category: grammar
 */
export const itVbzRule: GrammarRule = {
  id: 'it-vbz',
  name: '\'it\' + non-3rd person verb',
  description: 'After \'\\2\', use the third-person verb form .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]t\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'After \'\\2\', use the third-person verb form .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
