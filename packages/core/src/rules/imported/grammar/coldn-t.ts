import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * coudn't (couldn't)
 * 
 * Source: LanguageTool (COLDN_T)
 * Category: grammar
 */
export const coldnTRule: GrammarRule = {
  id: 'coldn-t',
  name: 'coudn\'t (couldn\'t)',
  description: 'Did you mean \\2\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(w|W|c|C|sh|Sh)oldn|(w|W|c|C|sh|Sh)uldn|(w|W|c|C|sh|Sh)oudn|(w|W|c|C|sh|Sh)ouln\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2\\3?',
        suggestions: ["\\2\\3"],
      });
    }
    
    return issues;
  },
};
