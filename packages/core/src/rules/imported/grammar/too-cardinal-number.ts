import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * too CARDINAL NUMBER
 * 
 * Source: LanguageTool (TOO_CARDINAL_NUMBER)
 * Category: grammar
 */
export const tooCardinalNumberRule: GrammarRule = {
  id: 'too-cardinal-number',
  name: 'too CARDINAL NUMBER',
  description: 'Did you mean to ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btoo\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to ?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
