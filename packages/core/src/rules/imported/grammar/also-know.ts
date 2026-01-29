import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * also know (known)
 * 
 * Source: LanguageTool (ALSO_KNOW)
 * Category: grammar
 */
export const alsoKnowRule: GrammarRule = {
  id: 'also-know',
  name: 'also know (known)',
  description: 'Did you mean known?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balso\b\s+\S+\s+\bknow\b\s+\bas|by|for\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean known?',
        suggestions: ["known"],
      });
    }
    
    return issues;
  },
};
