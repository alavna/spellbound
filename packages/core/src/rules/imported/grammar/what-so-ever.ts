import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whatsoever → whatsoever
 * 
 * Source: LanguageTool (WHAT_SO_EVER)
 * Category: grammar
 */
export const whatSoEverRule: GrammarRule = {
  id: 'what-so-ever',
  name: 'whatsoever → whatsoever',
  description: 'Did you mean whatsoever?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat\b\s+\bso\b\s+\bever\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whatsoever?',
        suggestions: ["whatsoever"],
      });
    }
    
    return issues;
  },
};
