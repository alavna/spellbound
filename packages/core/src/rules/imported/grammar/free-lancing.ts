import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * free lancing (freelancing)
 * 
 * Source: LanguageTool (FREE_LANCING)
 * Category: grammar
 */
export const freeLancingRule: GrammarRule = {
  id: 'free-lancing',
  name: 'free lancing (freelancing)',
  description: 'Did you mean freelancing?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfree\b\s+\blancing\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean freelancing?',
        suggestions: ["freelancing"],
      });
    }
    
    return issues;
  },
};
