import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * one foul (fell) swoop
 * 
 * Source: LanguageTool (ONE_FELL_SWOOP)
 * Category: grammar
 */
export const oneFellSwoopRule: GrammarRule = {
  id: 'one-fell-swoop',
  name: 'one foul (fell) swoop',
  description: 'Did you mean fell?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone\b\s+\bfoul\b\s+\bswoop\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fell?',
        suggestions: ["fell"],
      });
    }
    
    return issues;
  },
};
