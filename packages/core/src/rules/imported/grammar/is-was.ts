import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is was
 * 
 * Source: LanguageTool (IS_WAS)
 * Category: grammar
 */
export const isWasRule: GrammarRule = {
  id: 'is-was',
  name: 'is was',
  description: 'Did you mean \\1, \\2, or it \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]s\b\s+[Ww]as\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1, \\2, or it \\2?',
        suggestions: ["\\1","\\2","it \\2"],
      });
    }
    
    return issues;
  },
};
