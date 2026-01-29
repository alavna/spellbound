import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * law breaker (lawbreaker)
 * 
 * Source: LanguageTool (BREAKER_COMPOUNDS)
 * Category: grammar
 */
export const breakerCompoundsRule: GrammarRule = {
  id: 'breaker-compounds',
  name: 'law breaker (lawbreaker)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bground|strike|heart|trail|house|wind|tie|ice|law|jaw|deal\b\s+\bbreakers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
