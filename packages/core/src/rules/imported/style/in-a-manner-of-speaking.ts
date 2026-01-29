import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in a manner of speaking (omit)
 * 
 * Source: LanguageTool (IN_A_MANNER_OF_SPEAKING)
 * Category: style
 */
export const inAMannerOfSpeakingRule: GrammarRule = {
  id: 'in-a-manner-of-speaking',
  name: 'in a manner of speaking (omit)',
  description: 'See if you could remove this phrase.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\ba\b\s+\bmanner\b\s+\bof\b\s+\bspeaking\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'See if you could remove this phrase.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
