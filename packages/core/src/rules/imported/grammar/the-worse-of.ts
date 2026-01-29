import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * THE + RELATIVE + OF, e.g. the worse (worst) of
 * 
 * Source: LanguageTool (THE_WORSE_OF)
 * Category: grammar
 */
export const theWorseOfRule: GrammarRule = {
  id: 'the-worse-of',
  name: 'THE + RELATIVE + OF, e.g. the worse (worst) of',
  description: 'Use to express an extreme with this adjective.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use to express an extreme with this adjective.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
