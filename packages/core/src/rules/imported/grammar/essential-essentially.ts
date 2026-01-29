import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * essentially
 * 
 * Source: LanguageTool (ESSENTIAL_ESSENTIALLY)
 * Category: grammar
 */
export const essentialEssentiallyRule: GrammarRule = {
  id: 'essential-essentially',
  name: 'essentially',
  description: 'Did you mean essentially?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bessential\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean essentially?',
        suggestions: ["essentially"],
      });
    }
    
    return issues;
  },
};
