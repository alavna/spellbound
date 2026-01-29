import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * any how (anyhow)
 * 
 * Source: LanguageTool (HOW_COMPOUNDS)
 * Category: grammar
 */
export const howCompoundsRule: GrammarRule = {
  id: 'how-compounds',
  name: 'any how (anyhow)',
  description: 'The adverb \\1 is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bany|some\b\s+\bhow\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adverb \\1 is spelled as one word.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
