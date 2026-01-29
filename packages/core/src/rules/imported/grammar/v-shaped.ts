import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * v-shaped (V-turn)
 * 
 * Source: LanguageTool (V_SHAPED)
 * Category: grammar
 */
export const vShapedRule: GrammarRule = {
  id: 'v-shaped',
  name: 'v-shaped (V-turn)',
  description: 'The first letter in this adjective needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[uvalc]-shaped\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The first letter in this adjective needs to be capitalized.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
