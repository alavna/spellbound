import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * please not (note) that
 * 
 * Source: LanguageTool (PLEASE_NOT_THAT)
 * Category: grammar
 */
export const pleaseNotThatRule: GrammarRule = {
  id: 'please-not-that',
  name: 'please not (note) that',
  description: 'Did you mean note?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplease\b\s+\bnot\b\s+\bthat|there\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean note?',
        suggestions: ["note"],
      });
    }
    
    return issues;
  },
};
