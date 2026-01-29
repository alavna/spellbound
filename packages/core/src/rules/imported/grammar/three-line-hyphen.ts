import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'three line'
 * 
 * Source: LanguageTool (THREE_LINE_HYPHEN)
 * Category: grammar
 */
export const threeLineHyphenRule: GrammarRule = {
  id: 'three-line-hyphen',
  name: 'missing hyphen in \'three line\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthree\b\s+\bline\b\s+\boctaves?|whips?|poems?|stanzas?|verses?|equal\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
