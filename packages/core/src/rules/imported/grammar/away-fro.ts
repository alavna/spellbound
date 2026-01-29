import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * away fro (away from)
 * 
 * Source: LanguageTool (AWAY_FRO)
 * Category: grammar
 */
export const awayFroRule: GrammarRule = {
  id: 'away-fro',
  name: 'away fro (away from)',
  description: 'Did you mean away from?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baway\b\s+\bfro\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean away from?',
        suggestions: ["away from"],
      });
    }
    
    return issues;
  },
};
