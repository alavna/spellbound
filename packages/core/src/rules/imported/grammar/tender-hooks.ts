import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tender hooks (tenterhooks)
 * 
 * Source: LanguageTool (TENDER_HOOKS)
 * Category: grammar
 */
export const tenderHooksRule: GrammarRule = {
  id: 'tender-hooks',
  name: 'tender hooks (tenterhooks)',
  description: 'Did you mean \'tenterhooks\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\btender\b\s+\bhooks\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'tenterhooks\'?',
        suggestions: ["tenter\\3"],
      });
    }
    
    return issues;
  },
};
