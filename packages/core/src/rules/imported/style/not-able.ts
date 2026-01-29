import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * not able (unable)
 * 
 * Source: LanguageTool (NOT_ABLE)
 * Category: style
 */
export const notAbleRule: GrammarRule = {
  id: 'not-able',
  name: 'not able (unable)',
  description: 'Avoid using \"not\". Did you mean unable?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnot\b\s+\bable\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid using \"not\". Did you mean unable?',
        suggestions: ["unable"],
      });
    }
    
    return issues;
  },
};
