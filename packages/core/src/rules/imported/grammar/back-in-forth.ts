import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * back in forth (back and forth)
 * 
 * Source: LanguageTool (BACK_IN_FORTH)
 * Category: grammar
 */
export const backInForthRule: GrammarRule = {
  id: 'back-in-forth',
  name: 'back in forth (back and forth)',
  description: 'Did you mean back and forth?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bback\b\s+\bin\b\s+\bforth\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean back and forth?',
        suggestions: ["back and forth"],
      });
    }
    
    return issues;
  },
};
