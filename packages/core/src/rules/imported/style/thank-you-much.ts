import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Thank you much
 * 
 * Source: LanguageTool (THANK_YOU_MUCH)
 * Category: style
 */
export const thankYouMuchRule: GrammarRule = {
  id: 'thank-you-much',
  name: 'Thank you much',
  description: 'This phrase is non-standard. Consider replacing it.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthank\b\s+\byou\b\s+\bmuch\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is non-standard. Consider replacing it.',
        suggestions: ["\\1 \\2 so \\3","\\1 \\2 very \\3"],
      });
    }
    
    return issues;
  },
};
