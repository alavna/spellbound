import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wien vs Vienna
 * 
 * Source: LanguageTool (WIEN)
 * Category: grammar
 */
export const wienRule: GrammarRule = {
  id: 'wien',
  name: 'Wien vs Vienna',
  description: 'The English name for this Austrian city is Vienna.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwien\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The English name for this Austrian city is Vienna.',
        suggestions: ["Vienna"],
      });
    }
    
    return issues;
  },
};
