import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * knew (new)
 * 
 * Source: LanguageTool (KNEW_NEW)
 * Category: grammar
 */
export const knewNewRule: GrammarRule = {
  id: 'knew-new',
  name: 'knew (new)',
  description: 'Did you mean new?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bknew\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean new?',
        suggestions: ["new"],
      });
    }
    
    return issues;
  },
};
