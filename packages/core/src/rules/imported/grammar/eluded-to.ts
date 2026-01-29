import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * eluded to (alluded to)
 * 
 * Source: LanguageTool (ELUDED_TO)
 * Category: grammar
 */
export const eludedToRule: GrammarRule = {
  id: 'eluded-to',
  name: 'eluded to (alluded to)',
  description: 'Did you mean allude to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean allude to?',
        suggestions: ["allude to"],
      });
    }
    
    return issues;
  },
};
