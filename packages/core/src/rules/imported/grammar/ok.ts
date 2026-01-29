import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ok (OK)
 * 
 * Source: LanguageTool (OK)
 * Category: grammar
 */
export const okRule: GrammarRule = {
  id: 'ok',
  name: 'ok (OK)',
  description: 'Lower-case \'\\1\' is American English. For British English use OK.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Oo]k\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Lower-case \'\\1\' is American English. For British English use OK.',
        suggestions: ["OK"],
      });
    }
    
    return issues;
  },
};
