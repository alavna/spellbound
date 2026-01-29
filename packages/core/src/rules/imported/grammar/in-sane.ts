import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in sane (insane)
 * 
 * Source: LanguageTool (IN_SANE)
 * Category: grammar
 */
export const inSaneRule: GrammarRule = {
  id: 'in-sane',
  name: 'in sane (insane)',
  description: 'Did you mean the adjective insane?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdr[oi]ven?|driving|am|'m|are|'re|makes?|made|making|go(es)?|went|going|the|an?|my|y?our|his|our|their|me|him|her|them|you|of|with(out)?|for\b\s+\bin\b\s+\bsane\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective insane?',
        suggestions: ["insane"],
      });
    }
    
    return issues;
  },
};
