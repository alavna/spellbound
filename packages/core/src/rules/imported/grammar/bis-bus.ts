import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bis vs bus
 * 
 * Source: LanguageTool (BIS_BUS)
 * Category: grammar
 */
export const bisBusRule: GrammarRule = {
  id: 'bis-bus',
  name: 'bis vs bus',
  description: 'Did you mean the noun bus?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Bb]is\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun bus?',
        suggestions: ["bus"],
      });
    }
    
    return issues;
  },
};
