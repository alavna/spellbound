import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * was aloud (allowed)
 * 
 * Source: LanguageTool (WAS_ALOUD)
 * Category: grammar
 */
export const wasAloudRule: GrammarRule = {
  id: 'was-aloud',
  name: 'was aloud (allowed)',
  description: 'Did you mean \\1 allowed?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bw(?:as|ere)\s+\baloud\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 allowed?',
        suggestions: ["\\1 allowed"],
      });
    }
    
    return issues;
  },
};
