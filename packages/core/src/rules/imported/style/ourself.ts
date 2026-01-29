import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'ourself'
 * 
 * Source: LanguageTool (OURSELF)
 * Category: style
 */
export const ourselfRule: GrammarRule = {
  id: 'ourself',
  name: '\'ourself\'',
  description: 'The term is non-standard and not widely accepted.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bourself\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The term is non-standard and not widely accepted.',
        suggestions: ["ourselves"],
      });
    }
    
    return issues;
  },
};
