import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Geiger counter
 * 
 * Source: LanguageTool (GEIGER_COUNTER)
 * Category: grammar
 */
export const geigerCounterRule: GrammarRule = {
  id: 'geiger-counter',
  name: 'Geiger counter',
  description: 'The name \"Geiger\" needs to be capitalized in the noun Geiger \\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgeiger\b\s+\bcounters?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name \"Geiger\" needs to be capitalized in the noun Geiger \\2.',
        suggestions: ["Geiger \\2"],
      });
    }
    
    return issues;
  },
};
