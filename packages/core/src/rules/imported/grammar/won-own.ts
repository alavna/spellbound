import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * won vs own
 * 
 * Source: LanguageTool (WON_OWN)
 * Category: grammar
 */
export const wonOwnRule: GrammarRule = {
  id: 'won-own',
  name: 'won vs own',
  description: 'Did you mean own?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmy|y?our|their|its\b\s+\bwon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean own?',
        suggestions: ["own"],
      });
    }
    
    return issues;
  },
};
