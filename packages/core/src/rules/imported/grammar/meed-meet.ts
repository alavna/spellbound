import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * meed (meet)
 * 
 * Source: LanguageTool (MEED_MEET)
 * Category: grammar
 */
export const meedMeetRule: GrammarRule = {
  id: 'meed-meet',
  name: 'meed (meet)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Mm]eed|meeds\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
