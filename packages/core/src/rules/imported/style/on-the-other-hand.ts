import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on the other hand (omit, but, yet)
 * 
 * Source: LanguageTool (ON_THE_OTHER_HAND)
 * Category: style
 */
export const onTheOtherHandRule: GrammarRule = {
  id: 'on-the-other-hand',
  name: 'on the other hand (omit, but, yet)',
  description: 'Avoid completely or try but, yet',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bthe\b\s+\bother\b\s+\bhand\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid completely or try but, yet',
        suggestions: ["but","yet"],
      });
    }
    
    return issues;
  },
};
