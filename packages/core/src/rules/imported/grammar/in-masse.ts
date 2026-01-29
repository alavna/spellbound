import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in masse (en masse)
 * 
 * Source: LanguageTool (IN_MASSE)
 * Category: grammar
 */
export const inMasseRule: GrammarRule = {
  id: 'in-masse',
  name: 'in masse (en masse)',
  description: 'Did you mean en masse?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bmasse\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean en masse?',
        suggestions: ["en masse"],
      });
    }
    
    return issues;
  },
};
