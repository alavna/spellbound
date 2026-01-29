import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * old wise tail (old wives' tale)
 * 
 * Source: LanguageTool (OLD_WISE_TAILTALE)
 * Category: grammar
 */
export const oldWiseTailtaleRule: GrammarRule = {
  id: 'old-wise-tailtale',
  name: 'old wise tail (old wives\' tale)',
  description: 'Did you mean old wives\' tale?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bold\b\s+\bwise\b\s+\bta(il|le)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean old wives\' tale?',
        suggestions: ["old wives' tale"],
      });
    }
    
    return issues;
  },
};
