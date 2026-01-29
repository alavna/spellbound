import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * an another (an/another)
 * 
 * Source: LanguageTool (AN_ANOTHER)
 * Category: grammar
 */
export const anAnotherRule: GrammarRule = {
  id: 'an-another',
  name: 'an another (an/another)',
  description: 'One of these determiners is redundant in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban\b\s+\banother\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'One of these determiners is redundant in this context.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
