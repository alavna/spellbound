import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in edition (addition) to
 * 
 * Source: LanguageTool (IN_EDITION_TO)
 * Category: grammar
 */
export const inEditionToRule: GrammarRule = {
  id: 'in-edition-to',
  name: 'in edition (addition) to',
  description: 'Did you mean in addition to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bedition\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in addition to?',
        suggestions: ["in addition to"],
      });
    }
    
    return issues;
  },
};
