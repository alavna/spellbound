import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * up to data (date)
 * 
 * Source: LanguageTool (UP_TO_DATA)
 * Category: grammar
 */
export const upToDataRule: GrammarRule = {
  id: 'up-to-data',
  name: 'up to data (date)',
  description: 'Did you mean date?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bup\b\s+\bto\b\s+\bdata\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean date?',
        suggestions: ["date"],
      });
    }
    
    return issues;
  },
};
