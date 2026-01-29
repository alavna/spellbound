import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fro (for)
 * 
 * Source: LanguageTool (FOR_FRO)
 * Category: grammar
 */
export const forFroRule: GrammarRule = {
  id: 'for-fro',
  name: 'fro (for)',
  description: 'Did you mean for or from?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfro\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for or from?',
        suggestions: ["for","from"],
      });
    }
    
    return issues;
  },
};
