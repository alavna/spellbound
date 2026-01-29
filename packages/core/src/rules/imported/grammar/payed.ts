import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * payed (paid)
 * 
 * Source: LanguageTool (PAYED)
 * Category: grammar
 */
export const payedRule: GrammarRule = {
  id: 'payed',
  name: 'payed (paid)',
  description: 'Only in a nautical context \'payed\' is an acceptable past tense form of \'pay\'. Please check.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpayed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Only in a nautical context \'payed\' is an acceptable past tense form of \'pay\'. Please check.',
        suggestions: ["paid"],
      });
    }
    
    return issues;
  },
};
