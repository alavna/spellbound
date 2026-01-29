import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing space after closing quote
 * 
 * Source: LanguageTool (NO_SPACE_CLOSING_QUOTE)
 * Category: grammar
 */
export const noSpaceClosingQuoteRule: GrammarRule = {
  id: 'no-space-closing-quote',
  name: 'Missing space after closing quote',
  description: 'There should be a space after a closing quote.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /”\s+\.w\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'There should be a space after a closing quote.',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
