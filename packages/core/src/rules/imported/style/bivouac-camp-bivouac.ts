import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bivouac camp (bivouac)
 * 
 * Source: LanguageTool (BIVOUAC_CAMP_BIVOUAC)
 * Category: style
 */
export const bivouacCampBivouacRule: GrammarRule = {
  id: 'bivouac-camp-bivouac',
  name: 'bivouac camp (bivouac)',
  description: 'This phrase is redundant. Consider writing .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbivouac\b\s+\bcamp\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider writing .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
