import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for ever (forever)
 * 
 * Source: LanguageTool (FOR_EVER_GB)
 * Category: grammar
 */
export const forEverGbRule: GrammarRule = {
  id: 'for-ever-gb',
  name: 'for ever (forever)',
  description: 'It is more common to spell this adverb as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bever\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It is more common to spell this adverb as one word.',
        suggestions: ["forever"],
      });
    }
    
    return issues;
  },
};
