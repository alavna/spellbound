import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * functionally vs functionality
 * 
 * Source: LanguageTool (FUNCTIONALLY_FUNCTIONALITY)
 * Category: grammar
 */
export const functionallyFunctionalityRule: GrammarRule = {
  id: 'functionally-functionality',
  name: 'functionally vs functionality',
  description: 'Did you mean the noun functionality?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]he|[Aa]n?\s+\bfunctionally\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun functionality?',
        suggestions: ["functionality"],
      });
    }
    
    return issues;
  },
};
