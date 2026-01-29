import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * awaked (awoke, awoken)
 * 
 * Source: LanguageTool (AWAKED)
 * Category: style
 */
export const awakedRule: GrammarRule = {
  id: 'awaked',
  name: 'awaked (awoke, awoken)',
  description: 'Although \'\\1\' is British English, the usual spelling is awoke (past tense) or awoken (past participle).',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bawaked\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Although \'\\1\' is British English, the usual spelling is awoke (past tense) or awoken (past participle).',
        suggestions: ["awoke","awoken"],
      });
    }
    
    return issues;
  },
};
