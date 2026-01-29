import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * overall, not the garment, but sentence adverb
 * 
 * Source: LanguageTool (OVERALL)
 * Category: style
 */
export const overallRule: GrammarRule = {
  id: 'overall',
  name: 'overall, not the garment, but sentence adverb',
  description: 'Remove wordy \\1',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boverall\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Remove wordy \\1',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
