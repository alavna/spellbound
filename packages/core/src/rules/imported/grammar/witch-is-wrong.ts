import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * witch (which) is wrong
 * 
 * Source: LanguageTool (WITCH_IS_WRONG)
 * Category: grammar
 */
export const witchIsWrongRule: GrammarRule = {
  id: 'witch-is-wrong',
  name: 'witch (which) is wrong',
  description: 'Did you mean which?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwitch\b\s+\bis\.was\b\s+\bwrong\.right\.\.in\.\.correct\.available\.good\.due\.great\.likely\.responsible\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean which?',
        suggestions: ["which"],
      });
    }
    
    return issues;
  },
};
