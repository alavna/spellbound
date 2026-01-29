import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Legal jargon referring to previous text
 * 
 * Source: LanguageTool (REFERRING_BACK)
 * Category: style
 */
export const referringBackRule: GrammarRule = {
  id: 'referring-back',
  name: 'Legal jargon referring to previous text',
  description: 'Legalese. Bad style in any normal text. Remove and explain. Use this or these.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\babove-mentioned|abovementioned|above-listed|abovelisted|beforementioned|before-mentioned|aforementioned|afore-mentioned\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Legalese. Bad style in any normal text. Remove and explain. Use this or these.',
        suggestions: ["this","these"],
      });
    }
    
    return issues;
  },
};
