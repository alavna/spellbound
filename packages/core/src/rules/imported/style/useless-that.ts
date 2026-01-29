import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Possibly needless 'that'
 * 
 * Source: LanguageTool (USELESS_THAT)
 * Category: style
 */
export const uselessThatRule: GrammarRule = {
  id: 'useless-that',
  name: 'Possibly needless \'that\'',
  description: '\"\\2\" may be unnecessary here.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"\\2\" may be unnecessary here.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
