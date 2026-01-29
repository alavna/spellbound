import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * who than (then)
 * 
 * Source: LanguageTool (WHO_THAN)
 * Category: grammar
 */
export const whoThanRule: GrammarRule = {
  id: 'who-than',
  name: 'who than (then)',
  description: 'Did you mean then?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwho\b\s+\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean then?',
        suggestions: ["then"],
      });
    }
    
    return issues;
  },
};
