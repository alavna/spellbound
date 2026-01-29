import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * your'e (you're) it
 * 
 * Source: LanguageTool (YOUR_E)
 * Category: grammar
 */
export const yourERule: GrammarRule = {
  id: 'your-e',
  name: 'your\'e (you\'re) it',
  description: 'The apostrophe seems to be misplaced here. Did you mean \"you\'re\" (as in \'you are\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byour\b\s+&apostrophe;\s+\be\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The apostrophe seems to be misplaced here. Did you mean \"you\'re\" (as in \'you are\')?',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
