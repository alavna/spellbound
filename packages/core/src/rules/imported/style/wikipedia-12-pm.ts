import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Replace '12 pm' with 'noon'
 * 
 * Source: LanguageTool (WIKIPEDIA_12_PM)
 * Category: style
 */
export const wikipedia12PmRule: GrammarRule = {
  id: 'wikipedia-12-pm',
  name: 'Replace \'12 pm\' with \'noon\'',
  description: 'Wikipedia style. Replace \"12 pm\" with noon for clarity.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /12\s+\bpm\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Wikipedia style. Replace \"12 pm\" with noon for clarity.',
        suggestions: ["noon"],
      });
    }
    
    return issues;
  },
};
