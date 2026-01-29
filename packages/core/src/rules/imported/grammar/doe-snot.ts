import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * doe snot (does not)
 * 
 * Source: LanguageTool (DOE_SNOT)
 * Category: grammar
 */
export const doeSnotRule: GrammarRule = {
  id: 'doe-snot',
  name: 'doe snot (does not)',
  description: 'Did you mean \\1s ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdoe\b\s+\bsnot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1s ?',
        suggestions: ["\\1s"],
      });
    }
    
    return issues;
  },
};
