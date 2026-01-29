import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sou (you)
 * 
 * Source: LanguageTool (SOU_YOU)
 * Category: grammar
 */
export const souYouRule: GrammarRule = {
  id: 'sou-you',
  name: 'sou (you)',
  description: 'Did you mean you, soul or so?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSou|sou\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean you, soul or so?',
        suggestions: ["you","soul","so"],
      });
    }
    
    return issues;
  },
};
