import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * life long
 * 
 * Source: LanguageTool (LONG_COMPOUNDS)
 * Category: grammar
 */
export const longCompoundsRule: GrammarRule = {
  id: 'long-compounds',
  name: 'life long',
  description: 'The adjective lifelong is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blife\b\s+\blong\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective lifelong is spelled as one word.',
        suggestions: ["lifelong"],
      });
    }
    
    return issues;
  },
};
