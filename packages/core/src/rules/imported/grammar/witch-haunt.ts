import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * witch haunt (witch hunt)
 * 
 * Source: LanguageTool (WITCH_HAUNT)
 * Category: grammar
 */
export const witchHauntRule: GrammarRule = {
  id: 'witch-haunt',
  name: 'witch haunt (witch hunt)',
  description: 'Did you mean \\1 hunt (=search for witches)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwitch\b\s+\bhaunt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 hunt (=search for witches)?',
        suggestions: ["\\1 hunt"],
      });
    }
    
    return issues;
  },
};
