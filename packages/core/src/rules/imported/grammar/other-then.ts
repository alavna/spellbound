import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * other then (other than)
 * 
 * Source: LanguageTool (OTHER_THEN)
 * Category: grammar
 */
export const otherThenRule: GrammarRule = {
  id: 'other-then',
  name: 'other then (other than)',
  description: 'Did you mean other than?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bother\b\s+\bthen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean other than?',
        suggestions: ["other than"],
      });
    }
    
    return issues;
  },
};
