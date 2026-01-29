import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Good fuck (luck)
 * 
 * Source: LanguageTool (GOOD_FLUCK)
 * Category: style
 */
export const goodFluckRule: GrammarRule = {
  id: 'good-fluck',
  name: 'Good fuck (luck)',
  description: 'This word is considered offensive. Is it possible that you meant to write \'luck\'?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgood\b\s+\bfuck\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is considered offensive. Is it possible that you meant to write \'luck\'?',
        suggestions: ["luck"],
      });
    }
    
    return issues;
  },
};
