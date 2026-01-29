import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * beyond the pail (pale)
 * 
 * Source: LanguageTool (BEYOND_THE_PAIL)
 * Category: grammar
 */
export const beyondThePailRule: GrammarRule = {
  id: 'beyond-the-pail',
  name: 'beyond the pail (pale)',
  description: 'Did you mean beyond the pale?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbeyond\b\s+\bthe\b\s+\bpail\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean beyond the pale?',
        suggestions: ["beyond the pale"],
      });
    }
    
    return issues;
  },
};
