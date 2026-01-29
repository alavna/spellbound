import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tor vs to
 * 
 * Source: LanguageTool (TOR_TO)
 * Category: grammar
 */
export const torToRule: GrammarRule = {
  id: 'tor-to',
  name: 'tor vs to',
  description: 'Did you mean to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btor\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
