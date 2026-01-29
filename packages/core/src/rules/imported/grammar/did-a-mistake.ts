import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * made (did) a mistake
 * 
 * Source: LanguageTool (DID_A_MISTAKE)
 * Category: grammar
 */
export const didAMistakeRule: GrammarRule = {
  id: 'did-a-mistake',
  name: 'made (did) a mistake',
  description: 'Did you mean made?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban\.\.some\b\s+\bmistakes\.\.errors\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean made?',
        suggestions: ["made"],
      });
    }
    
    return issues;
  },
};
