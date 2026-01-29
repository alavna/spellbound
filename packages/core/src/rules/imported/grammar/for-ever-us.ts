import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for ever (forever)
 * 
 * Source: LanguageTool (FOR_EVER_US)
 * Category: grammar
 */
export const forEverUsRule: GrammarRule = {
  id: 'for-ever-us',
  name: 'for ever (forever)',
  description: 'The adverb forever is spelled as one word.',
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
        message: 'The adverb forever is spelled as one word.',
        suggestions: ["forever"],
      });
    }
    
    return issues;
  },
};
