import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'Them (Then)' at sentence start
 * 
 * Source: LanguageTool (SENT_START_THEM)
 * Category: grammar
 */
export const sentStartThemRule: GrammarRule = {
  id: 'sent-start-them',
  name: '\'Them (Then)\' at sentence start',
  description: 'Did you mean Then?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bTh(em|an)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Then?',
        suggestions: ["Then"],
      });
    }
    
    return issues;
  },
};
