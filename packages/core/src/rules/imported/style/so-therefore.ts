import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * so therefore (therefore)
 * 
 * Source: LanguageTool (SO_THEREFORE)
 * Category: style
 */
export const soThereforeRule: GrammarRule = {
  id: 'so-therefore',
  name: 'so therefore (therefore)',
  description: 'Consider using \\1 or \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bso\b\s+\btherefore\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 or \\2.',
        suggestions: ["\\1","\\2"],
      });
    }
    
    return issues;
  },
};
