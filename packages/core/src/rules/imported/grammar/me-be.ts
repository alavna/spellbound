import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * me vs be
 * 
 * Source: LanguageTool (ME_BE)
 * Category: grammar
 */
export const meBeRule: GrammarRule = {
  id: 'me-be',
  name: 'me vs be',
  description: 'Did you mean be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bme\b/gi;
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
