import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong phrase: 'in nowadays' (nowadays)
 * 
 * Source: LanguageTool (IN_NOWADAYS)
 * Category: grammar
 */
export const inNowadaysRule: GrammarRule = {
  id: 'in-nowadays',
  name: 'Wrong phrase: \'in nowadays\' (nowadays)',
  description: '\\2 is used without \'in\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bnowadays\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\\2 is used without \'in\'.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
