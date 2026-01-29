import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * soon (sooner) or later
 * 
 * Source: LanguageTool (SOON_OR_LATER)
 * Category: grammar
 */
export const soonOrLaterRule: GrammarRule = {
  id: 'soon-or-later',
  name: 'soon (sooner) or later',
  description: 'Did you mean sooner \\2 \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsoon\b\s+\bor|than\b\s+\blater\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sooner \\2 \\3?',
        suggestions: ["sooner \\2 \\3"],
      });
    }
    
    return issues;
  },
};
