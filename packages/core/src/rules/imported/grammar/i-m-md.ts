import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I'm might (I might) be
 * 
 * Source: LanguageTool (I_M_MD)
 * Category: grammar
 */
export const iMMdRule: GrammarRule = {
  id: 'i-m-md',
  name: 'I\'m might (I might) be',
  description: 'It seems that only one verb should be used here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bs?he|it|we|they|you|I\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that only one verb should be used here.',
        suggestions: ["\\3 \\6"],
      });
    }
    
    return issues;
  },
};
