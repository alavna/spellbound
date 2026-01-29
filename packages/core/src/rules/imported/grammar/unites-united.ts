import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Unites (United)
 * 
 * Source: LanguageTool (UNITES_UNITED)
 * Category: grammar
 */
export const unitesUnitedRule: GrammarRule = {
  id: 'unites-united',
  name: 'Unites (United)',
  description: 'Did you mean United ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bunites\b\s+\bstates|airlines|kingdom|Nations\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean United ?',
        suggestions: ["United"],
      });
    }
    
    return issues;
  },
};
