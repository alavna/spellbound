import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wud like (would like)
 * 
 * Source: LanguageTool (WUD_LIKE)
 * Category: grammar
 */
export const wudLikeRule: GrammarRule = {
  id: 'wud-like',
  name: 'wud like (would like)',
  description: 'Did you mean would \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwud\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean would \\2?',
        suggestions: ["would \\2"],
      });
    }
    
    return issues;
  },
};
