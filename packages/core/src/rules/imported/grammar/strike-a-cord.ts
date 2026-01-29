import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * strike a cord (chord)
 * 
 * Source: LanguageTool (STRIKE_A_CORD)
 * Category: grammar
 */
export const strikeACordRule: GrammarRule = {
  id: 'strike-a-cord',
  name: 'strike a cord (chord)',
  description: 'Did you mean strike a chord?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstrike\b\s+\ba\b\s+\bcord\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean strike a chord?',
        suggestions: ["strike a chord"],
      });
    }
    
    return issues;
  },
};
