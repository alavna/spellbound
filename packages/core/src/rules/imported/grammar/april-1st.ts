import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * good advice
 * 
 * Source: LanguageTool (APRIL_1ST)
 * Category: grammar
 */
export const april1stRule: GrammarRule = {
  id: 'april-1st',
  name: 'good advice',
  description: 'No you don\'t.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI\b\s+\bwant\b\s+\bto\b\s+\bbuy\b\s+\ba|an\b\s+\bBMW\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'No you don\'t.',
        suggestions: ["Tesla"],
      });
    }
    
    return issues;
  },
};
