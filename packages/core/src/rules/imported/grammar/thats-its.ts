import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * that's its (possessive)
 * 
 * Source: LanguageTool (THATS_ITS)
 * Category: grammar
 */
export const thatsItsRule: GrammarRule = {
  id: 'thats-its',
  name: 'that\'s its (possessive)',
  description: 'Did you mean its?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat|it|who|s?he|there\b\s+'s\b\s+\bit\b\s+'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean its?',
        suggestions: ["its"],
      });
    }
    
    return issues;
  },
};
