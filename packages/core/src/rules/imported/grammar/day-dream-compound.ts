import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * day dreaming (daydreaming)
 * 
 * Source: LanguageTool (DAY_DREAM_COMPOUND)
 * Category: grammar
 */
export const dayDreamCompoundRule: GrammarRule = {
  id: 'day-dream-compound',
  name: 'day dreaming (daydreaming)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bday\b\s+\bdream(s|ed|ing)?|dreamers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["day"],
      });
    }
    
    return issues;
  },
};
