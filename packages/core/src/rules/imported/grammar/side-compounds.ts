import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * country side (countryside)
 * 
 * Source: LanguageTool (SIDE_COMPOUNDS)
 * Category: grammar
 */
export const sideCompoundsRule: GrammarRule = {
  id: 'side-compounds',
  name: 'country side (countryside)',
  description: 'The noun or adjective side is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bcountry|sea|river|water|road|hill|lake|curb|fire|beach|shore|court|dock|broad|bed|trail\b\s+\bside\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun or adjective side is spelled as one word.',
        suggestions: ["side"],
      });
    }
    
    return issues;
  },
};
