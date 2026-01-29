import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * vitamin C
 * 
 * Source: LanguageTool (VITAMIN_C)
 * Category: grammar
 */
export const vitaminCRule: GrammarRule = {
  id: 'vitamin-c',
  name: 'vitamin C',
  description: 'The word \'vitamin\' is normally not capitalized in the expression',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvitamin\b\s+[A-Z]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'vitamin\' is normally not capitalized in the expression',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
