import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * incredible to believe (incredible)
 * 
 * Source: LanguageTool (INCREDIBLE_TO_BELIEVE)
 * Category: style
 */
export const incredibleToBelieveRule: GrammarRule = {
  id: 'incredible-to-believe',
  name: 'incredible to believe (incredible)',
  description: 'This phrase is redundant. Consider using incredible.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bincredible\b\s+\bto\b\s+\bbelieve\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider using incredible.',
        suggestions: ["incredible"],
      });
    }
    
    return issues;
  },
};
