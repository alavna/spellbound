import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * comma between 'then' and 'when'
 * 
 * Source: LanguageTool (THEN_WHEN_COMMA)
 * Category: grammar
 */
export const thenWhenCommaRule: GrammarRule = {
  id: 'then-when-comma',
  name: 'comma between \'then\' and \'when\'',
  description: 'Consider adding a comma here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthen\b\s+\bwhen|once|although|if\b\s+\S+\s+,/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding a comma here.',
        suggestions: ["\\2 \\3,"],
      });
    }
    
    return issues;
  },
};
