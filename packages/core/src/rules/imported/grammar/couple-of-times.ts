import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * couples of times (couple of times)
 * 
 * Source: LanguageTool (COUPLE_OF_TIMES)
 * Category: grammar
 */
export const coupleOfTimesRule: GrammarRule = {
  id: 'couple-of-times',
  name: 'couples of times (couple of times)',
  description: 'Did you mean couple of times?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcouples?\s+\boff?\s+\btimes?|things?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean couple of times?',
        suggestions: ["couple of times"],
      });
    }
    
    return issues;
  },
};
