import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * nee (née)
 * 
 * Source: LanguageTool (NEE)
 * Category: grammar
 */
export const neeRule: GrammarRule = {
  id: 'nee',
  name: 'nee (née)',
  description: 'Did you mean the adjective née (= formerly called), the verb need or the adjective new?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Nn]ee\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective née (= formerly called), the verb need or the adjective new?',
        suggestions: ["née","need","new"],
      });
    }
    
    return issues;
  },
};
