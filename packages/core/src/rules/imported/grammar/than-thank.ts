import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Than (Thank) you
 * 
 * Source: LanguageTool (THAN_THANK)
 * Category: grammar
 */
export const thanThankRule: GrammarRule = {
  id: 'than-thank',
  name: 'Than (Thank) you',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byes\b\s+\bthan\b\s+\byou\b/gi;
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
