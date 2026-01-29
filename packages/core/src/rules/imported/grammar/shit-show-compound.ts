import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * shit show (shitshow)
 * 
 * Source: LanguageTool (SHIT_SHOW_COMPOUND)
 * Category: grammar
 */
export const shitShowCompoundRule: GrammarRule = {
  id: 'shit-show-compound',
  name: 'shit show (shitshow)',
  description: 'The noun shitshow is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\S+\s+\bshit\b\s+\bshow\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun shitshow is spelled as one word.',
        suggestions: ["shitshow"],
      });
    }
    
    return issues;
  },
};
