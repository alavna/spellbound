import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * every body (everybody)
 * 
 * Source: LanguageTool (EVERY_BODY)
 * Category: grammar
 */
export const everyBodyRule: GrammarRule = {
  id: 'every-body',
  name: 'every body (everybody)',
  description: 'The pronoun every is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bevery\b\s+\bbody\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The pronoun every is spelled as one word.',
        suggestions: ["every"],
      });
    }
    
    return issues;
  },
};
