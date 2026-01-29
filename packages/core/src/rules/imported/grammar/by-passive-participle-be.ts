import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'by' + passive participle (be)
 * 
 * Source: LanguageTool (BY_PASSIVE_PARTICIPLE_BE)
 * Category: grammar
 */
export const byPassiveParticipleBeRule: GrammarRule = {
  id: 'by-passive-participle-be',
  name: '\'by\' + passive participle (be)',
  description: 'Did you mean be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean be?',
        suggestions: ["be"],
      });
    }
    
    return issues;
  },
};
