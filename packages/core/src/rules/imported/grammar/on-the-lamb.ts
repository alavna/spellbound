import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on the lamb (lam)
 * 
 * Source: LanguageTool (ON_THE_LAMB)
 * Category: grammar
 */
export const onTheLambRule: GrammarRule = {
  id: 'on-the-lamb',
  name: 'on the lamb (lam)',
  description: 'Did you mean on the lam?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bthe\b\s+\blamb\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on the lam?',
        suggestions: ["on the lam"],
      });
    }
    
    return issues;
  },
};
