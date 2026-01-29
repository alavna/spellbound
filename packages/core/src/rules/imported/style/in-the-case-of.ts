import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the case of (about, to)
 * 
 * Source: LanguageTool (IN_THE_CASE_OF)
 * Category: style
 */
export const inTheCaseOfRule: GrammarRule = {
  id: 'in-the-case-of',
  name: 'in the case of (about, to)',
  description: 'Change to about or to and change the word order of the sentence.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bcase\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Change to about or to and change the word order of the sentence.',
        suggestions: ["about","to"],
      });
    }
    
    return issues;
  },
};
