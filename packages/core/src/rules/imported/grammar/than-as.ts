import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * more sales as (than) last year
 * 
 * Source: LanguageTool (THAN_AS)
 * Category: grammar
 */
export const thanAsRule: GrammarRule = {
  id: 'than-as',
  name: 'more sales as (than) last year',
  description: 'Did you mean than?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmore|less\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean than?',
        suggestions: ["than"],
      });
    }
    
    return issues;
  },
};
