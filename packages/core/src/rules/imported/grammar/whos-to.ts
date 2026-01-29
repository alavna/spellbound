import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * who's PREPOSITION
 * 
 * Source: LanguageTool (WHOS_TO)
 * Category: grammar
 */
export const whosToRule: GrammarRule = {
  id: 'whos-to',
  name: 'who\'s PREPOSITION',
  description: 'Did you mean Who\'s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwhose\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Who\'s?',
        suggestions: ["Who's"],
      });
    }
    
    return issues;
  },
};
