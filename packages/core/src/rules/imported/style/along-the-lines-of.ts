import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * along the lines of (like)
 * 
 * Source: LanguageTool (ALONG_THE_LINES_OF)
 * Category: style
 */
export const alongTheLinesOfRule: GrammarRule = {
  id: 'along-the-lines-of',
  name: 'along the lines of (like)',
  description: 'Did you mean like?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balong\b\s+\bthe\b\s+\blines\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean like?',
        suggestions: ["like"],
      });
    }
    
    return issues;
  },
};
