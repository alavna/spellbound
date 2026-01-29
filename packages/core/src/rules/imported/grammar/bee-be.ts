import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bee vs be
 * 
 * Source: LanguageTool (BEE_BE)
 * Category: grammar
 */
export const beeBeRule: GrammarRule = {
  id: 'bee-be',
  name: 'bee vs be',
  description: 'Did you mean be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbee\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean be?',
        suggestions: ["be"],
      });
    }
    
    return issues;
  },
};
