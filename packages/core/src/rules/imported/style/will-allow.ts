import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * This will allow (allows) them to bloom...
 * 
 * Source: LanguageTool (WILL_ALLOW)
 * Category: style
 */
export const willAllowRule: GrammarRule = {
  id: 'will-allow',
  name: 'This will allow (allows) them to bloom...',
  description: 'Future tense may not be necessary in this context.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwill\b\s+\ballow\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Future tense may not be necessary in this context.',
        suggestions: ["allows"],
      });
    }
    
    return issues;
  },
};
