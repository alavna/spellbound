import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * That being sad (said)
 * 
 * Source: LanguageTool (THAT_BEING_SAID)
 * Category: grammar
 */
export const thatBeingSaidRule: GrammarRule = {
  id: 'that-being-said',
  name: 'That being sad (said)',
  description: 'Did you mean That being said?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bThat\b\s+\bbeing\b\s+\bsa[dt]|aid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean That being said?',
        suggestions: ["That being said"],
      });
    }
    
    return issues;
  },
};
