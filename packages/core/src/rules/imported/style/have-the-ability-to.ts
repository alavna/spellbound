import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * have the ability to (be able to, can)
 * 
 * Source: LanguageTool (HAVE_THE_ABILITY_TO)
 * Category: style
 */
export const haveTheAbilityToRule: GrammarRule = {
  id: 'have-the-ability-to',
  name: 'have the ability to (be able to, can)',
  description: 'Did you mean can?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bthe\b\s+\bability\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean can?',
        suggestions: ["can"],
      });
    }
    
    return issues;
  },
};
