import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Union Jack
 * 
 * Source: LanguageTool (UNION_JACK)
 * Category: grammar
 */
export const unionJackRule: GrammarRule = {
  id: 'union-jack',
  name: 'Union Jack',
  description: 'Capitalize this word if you mean the national flag of the UK.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bunion\b\s+\bjack\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Capitalize this word if you mean the national flag of the UK.',
        suggestions: ["Union Jack"],
      });
    }
    
    return issues;
  },
};
