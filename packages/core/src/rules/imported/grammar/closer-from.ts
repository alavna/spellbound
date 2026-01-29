import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * closer from/to
 * 
 * Source: LanguageTool (CLOSER_FROM)
 * Category: grammar
 */
export const closerFromRule: GrammarRule = {
  id: 'closer-from',
  name: 'closer from/to',
  description: 'The usual collocation for \"\\1\" is \"to\", not \"from\". Did you mean simply \\1 to or further from?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcloser|near\b\s+\bfrom\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\1\" is \"to\", not \"from\". Did you mean simply \\1 to or further from?',
        suggestions: ["\\1 to","further from"],
      });
    }
    
    return issues;
  },
};
