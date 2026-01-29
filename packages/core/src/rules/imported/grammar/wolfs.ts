import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wolfs vs wolves
 * 
 * Source: LanguageTool (WOLFS)
 * Category: grammar
 */
export const wolfsRule: GrammarRule = {
  id: 'wolfs',
  name: 'wolfs vs wolves',
  description: 'The plural of the word \"wolf\" (= animal) is wolves.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwolfs\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The plural of the word \"wolf\" (= animal) is wolves.',
        suggestions: ["wolves"],
      });
    }
    
    return issues;
  },
};
