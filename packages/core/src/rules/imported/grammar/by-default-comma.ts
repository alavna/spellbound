import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma after by default at the beginning of a sentence.
 * 
 * Source: LanguageTool (BY_DEFAULT_COMMA)
 * Category: grammar
 */
export const byDefaultCommaRule: GrammarRule = {
  id: 'by-default-comma',
  name: 'Comma after by default at the beginning of a sentence.',
  description: 'Did you mean: By default,?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bBy\b\s+\bdefault\b\s+(?!,|&hyphen;|;)\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean: By default,?',
        suggestions: ["By default,"],
      });
    }
    
    return issues;
  },
};
