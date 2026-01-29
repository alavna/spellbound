import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fir vs for
 * 
 * Source: LanguageTool (FIR_FOR)
 * Category: grammar
 */
export const firForRule: GrammarRule = {
  id: 'fir-for',
  name: 'fir vs for',
  description: 'Did you mean the preposition for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfir\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the preposition for?',
        suggestions: ["for"],
      });
    }
    
    return issues;
  },
};
