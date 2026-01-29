import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * approximately about
 * 
 * Source: LanguageTool (APPROXIMATELY_ABOUT)
 * Category: style
 */
export const approximatelyAboutRule: GrammarRule = {
  id: 'approximately-about',
  name: 'approximately about',
  description: 'This phrase is redundant. Consider using .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bapproximately\b\s+\babout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
