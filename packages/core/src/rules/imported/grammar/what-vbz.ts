import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 3rd person verb (base verb) after what/who
 * 
 * Source: LanguageTool (WHAT_VBZ)
 * Category: grammar
 */
export const whatVbzRule: GrammarRule = {
  id: 'what-vbz',
  name: '3rd person verb (base verb) after what/who',
  description: 'After \'\\2\', use the third-person verb form .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bWh(at|o)\s+\S+/gi;
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
