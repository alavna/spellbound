import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I (if)
 * 
 * Source: LanguageTool (I_IF)
 * Category: grammar
 */
export const iIfRule: GrammarRule = {
  id: 'i-if',
  name: 'I (if)',
  description: 'Did you mean If or is a comma missing (I,)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bI\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean If or is a comma missing (I,)?',
        suggestions: ["If","I,"],
      });
    }
    
    return issues;
  },
};
