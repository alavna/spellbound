import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * unicode (Unicode)
 * 
 * Source: LanguageTool (UNICODE_CASING)
 * Category: grammar
 */
export const unicodeCasingRule: GrammarRule = {
  id: 'unicode-casing',
  name: 'unicode (Unicode)',
  description: 'The name of this text encoding standard needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bunicode\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this text encoding standard needs to be capitalized.',
        suggestions: ["Unicode"],
      });
    }
    
    return issues;
  },
};
