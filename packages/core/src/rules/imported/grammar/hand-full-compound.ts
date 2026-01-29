import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hand full (handful)
 * 
 * Source: LanguageTool (HAND_FULL_COMPOUND)
 * Category: grammar
 */
export const handFullCompoundRule: GrammarRule = {
  id: 'hand-full-compound',
  name: 'hand full (handful)',
  description: 'The noun handful is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\S+\s+\bhand\b\s+\bfull?\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun handful is spelled as one word.',
        suggestions: ["handful"],
      });
    }
    
    return issues;
  },
};
