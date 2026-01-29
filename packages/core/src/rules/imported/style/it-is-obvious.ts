import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It is obvious (unscientific)
 * 
 * Source: LanguageTool (IT_IS_OBVIOUS)
 * Category: style
 */
export const itIsObviousRule: GrammarRule = {
  id: 'it-is-obvious',
  name: 'It is obvious (unscientific)',
  description: 'If possible, be specific about why that is obvious.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit\b\s+['i]s\b\s+\bobvious\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If possible, be specific about why that is obvious.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
