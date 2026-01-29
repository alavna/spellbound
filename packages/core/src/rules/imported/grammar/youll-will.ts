import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * youll will (you will)
 * 
 * Source: LanguageTool (YOULL_WILL)
 * Category: grammar
 */
export const youllWillRule: GrammarRule = {
  id: 'youll-will',
  name: 'youll will (you will)',
  description: 'Did you mean will?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou|I|we|they|she|he\b\s+'ll\b\s+\bwill\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean will?',
        suggestions: ["will"],
      });
    }
    
    return issues;
  },
};
