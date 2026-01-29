import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * both... as well as (and)
 * 
 * Source: LanguageTool (BOTH_AS_WELL_AS)
 * Category: grammar
 */
export const bothAsWellAsRule: GrammarRule = {
  id: 'both-as-well-as',
  name: 'both... as well as (and)',
  description: 'Probable usage error. Use and after \'both\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\bwell\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Probable usage error. Use and after \'both\'.',
        suggestions: ["and"],
      });
    }
    
    return issues;
  },
};
