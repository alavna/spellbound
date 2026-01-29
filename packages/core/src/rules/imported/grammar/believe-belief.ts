import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * believe (belief)
 * 
 * Source: LanguageTool (BELIEVE_BELIEF)
 * Category: grammar
 */
export const believeBeliefRule: GrammarRule = {
  id: 'believe-belief',
  name: 'believe (belief)',
  description: 'Did you mean (noun) instead of (verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[rb]elieves?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (noun) instead of (verb)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
