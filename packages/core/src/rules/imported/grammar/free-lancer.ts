import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * free lancer (freelancer)
 * 
 * Source: LanguageTool (FREE_LANCER)
 * Category: grammar
 */
export const freeLancerRule: GrammarRule = {
  id: 'free-lancer',
  name: 'free lancer (freelancer)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfree\b\s+\blancers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
