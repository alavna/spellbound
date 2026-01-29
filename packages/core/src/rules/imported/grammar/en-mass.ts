import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * en mass (en masse)
 * 
 * Source: LanguageTool (EN_MASS)
 * Category: grammar
 */
export const enMassRule: GrammarRule = {
  id: 'en-mass',
  name: 'en mass (en masse)',
  description: 'Did you mean en masse?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ben\b\s+\bmass\b/gi;
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
