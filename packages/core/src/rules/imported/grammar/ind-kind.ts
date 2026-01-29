import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ind vs kind
 * 
 * Source: LanguageTool (IND_KIND)
 * Category: grammar
 */
export const indKindRule: GrammarRule = {
  id: 'ind-kind',
  name: 'ind vs kind',
  description: 'Did you mean kind?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bind\b\s+\bmessage|regards|feedback|words|of\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean kind?',
        suggestions: ["kind"],
      });
    }
    
    return issues;
  },
};
