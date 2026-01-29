import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * comfortable with doing (comfortable doing)
 * 
 * Source: LanguageTool (COMFORTABLE_WITH_VBG)
 * Category: style
 */
export const comfortableWithVbgRule: GrammarRule = {
  id: 'comfortable-with-vbg',
  name: 'comfortable with doing (comfortable doing)',
  description: 'Consider using \\1 \\3.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcomfortable\b\s+\bwith\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 \\3.',
        suggestions: ["\\1 \\3"],
      });
    }
    
    return issues;
  },
};
