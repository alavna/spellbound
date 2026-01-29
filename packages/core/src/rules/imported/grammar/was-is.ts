import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * was is
 * 
 * Source: LanguageTool (WAS_IS)
 * Category: grammar
 */
export const wasIsRule: GrammarRule = {
  id: 'was-is',
  name: 'was is',
  description: 'Did you mean \\1, \\2, or \\1 it?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ww]as\b\s+[Ii]s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1, \\2, or \\1 it?',
        suggestions: ["\\1","\\2","\\1 it"],
      });
    }
    
    return issues;
  },
};
