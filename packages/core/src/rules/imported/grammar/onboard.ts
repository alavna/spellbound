import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * onboard -> on board
 * 
 * Source: LanguageTool (ONBOARD)
 * Category: grammar
 */
export const onboardRule: GrammarRule = {
  id: 'onboard',
  name: 'onboard -> on board',
  description: 'In this context, on board is used as an adverb and should be spelled as two words.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhave|having|gets?|getting|welcomes?|welcoming\b\s+\byou|me|them|him|her\b\s+\bon-?board\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, on board is used as an adverb and should be spelled as two words.',
        suggestions: ["on board"],
      });
    }
    
    return issues;
  },
};
