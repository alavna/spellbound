import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Miami-Dade
 * 
 * Source: LanguageTool (HARLEY_DAVIDSON_HYPHEN)
 * Category: grammar
 */
export const harleyDavidsonHyphenRule: GrammarRule = {
  id: 'harley-davidson-hyphen',
  name: 'Miami-Dade',
  description: 'The name of this motorcycle maker is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bharley\b\s+\bdavidson\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this motorcycle maker is spelled with a hyphen.',
        suggestions: ["Harley-Davidson"],
      });
    }
    
    return issues;
  },
};
