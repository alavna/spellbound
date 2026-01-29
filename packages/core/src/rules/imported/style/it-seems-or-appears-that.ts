import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it seems that (omit)
 * 
 * Source: LanguageTool (IT_SEEMS_OR_APPEARS_THAT)
 * Category: style
 */
export const itSeemsOrAppearsThatRule: GrammarRule = {
  id: 'it-seems-or-appears-that',
  name: 'it seems that (omit)',
  description: 'Possibly empty phrase \"\\1 \\2 \\3\"',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit\b\s+\bseems|appears\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possibly empty phrase \"\\1 \\2 \\3\"',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
