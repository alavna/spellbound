import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * there fore (therefore)
 * 
 * Source: LanguageTool (THERE_FORE)
 * Category: grammar
 */
export const thereForeRule: GrammarRule = {
  id: 'there-fore',
  name: 'there fore (therefore)',
  description: 'Did you mean the adverb \\1fore (spelled as one word)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthere|where\b\s+\bfore\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb \\1fore (spelled as one word)?',
        suggestions: ["\\1fore"],
      });
    }
    
    return issues;
  },
};
