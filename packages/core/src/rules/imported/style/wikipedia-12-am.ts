import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Replace '12 am' with 'midnight'
 * 
 * Source: LanguageTool (WIKIPEDIA_12_AM)
 * Category: style
 */
export const wikipedia12AmRule: GrammarRule = {
  id: 'wikipedia-12-am',
  name: 'Replace \'12 am\' with \'midnight\'',
  description: 'Wikipedia style. Replace \"12 am\" with midnight for clarity.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /12\s+\bam\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Wikipedia style. Replace \"12 am\" with midnight for clarity.',
        suggestions: ["midnight"],
      });
    }
    
    return issues;
  },
};
