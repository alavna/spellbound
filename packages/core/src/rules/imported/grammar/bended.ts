import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bended (bent)
 * 
 * Source: LanguageTool (BENDED)
 * Category: grammar
 */
export const bendedRule: GrammarRule = {
  id: 'bended',
  name: 'bended (bent)',
  description: 'The past tense and past participle of the verb \"bend\" is bent.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbended\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense and past participle of the verb \"bend\" is bent.',
        suggestions: ["bent"],
      });
    }
    
    return issues;
  },
};
