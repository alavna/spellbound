import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * was lain (laid)
 * 
 * Source: LanguageTool (WAS_LAIN)
 * Category: grammar
 */
export const wasLainRule: GrammarRule = {
  id: 'was-lain',
  name: 'was lain (laid)',
  description: 'Did you mean \\1 laid?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bw(?:as|ere)\s+\blain\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 laid?',
        suggestions: ["\\1 laid"],
      });
    }
    
    return issues;
  },
};
