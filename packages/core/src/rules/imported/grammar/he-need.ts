import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He need (needs)
 * 
 * Source: LanguageTool (HE_NEED)
 * Category: grammar
 */
export const heNeedRule: GrammarRule = {
  id: 'he-need',
  name: 'He need (needs)',
  description: 'The pronoun \'\\1\' requires a third-person verb or a past tense.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bneed\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The pronoun \'\\1\' requires a third-person verb or a past tense.',
        suggestions: ["needs","needed"],
      });
    }
    
    return issues;
  },
};
