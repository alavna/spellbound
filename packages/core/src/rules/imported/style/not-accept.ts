import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not accept (reject)
 * 
 * Source: LanguageTool (NOT_ACCEPT)
 * Category: style
 */
export const notAcceptRule: GrammarRule = {
  id: 'not-accept',
  name: 'not accept (reject)',
  description: 'Avoid using \"not\". Did you mean reject?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean reject?',
        suggestions: ["reject"],
      });
    }
    
    return issues;
  },
};
