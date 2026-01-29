import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Thanks in advanced (advance)
 * 
 * Source: LanguageTool (THANKS_IN_ADVANCED)
 * Category: grammar
 */
export const thanksInAdvancedRule: GrammarRule = {
  id: 'thanks-in-advanced',
  name: 'Thanks in advanced (advance)',
  description: 'Did you mean advance?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthanks?\s+\bin\b\s+\badvance[ds]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean advance?',
        suggestions: ["advance"],
      });
    }
    
    return issues;
  },
};
