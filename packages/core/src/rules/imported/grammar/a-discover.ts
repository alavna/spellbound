import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a discover (discovery)
 * 
 * Source: LanguageTool (A_DISCOVER)
 * Category: grammar
 */
export const aDiscoverRule: GrammarRule = {
  id: 'a-discover',
  name: 'a discover (discovery)',
  description: '\"Discover\" is a verb. Did you mean the noun discovery?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the\b\s+\bdiscover\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Discover\" is a verb. Did you mean the noun discovery?',
        suggestions: ["discovery"],
      });
    }
    
    return issues;
  },
};
