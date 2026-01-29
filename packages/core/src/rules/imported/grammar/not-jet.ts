import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not jet (yet)
 * 
 * Source: LanguageTool (NOT_JET)
 * Category: grammar
 */
export const notJetRule: GrammarRule = {
  id: 'not-jet',
  name: 'not jet (yet)',
  description: 'Did you mean yet?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\bjet\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean yet?',
        suggestions: ["yet"],
      });
    }
    
    return issues;
  },
};
