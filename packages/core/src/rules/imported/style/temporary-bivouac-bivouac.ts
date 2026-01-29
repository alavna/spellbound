import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * temporary bivouac (bivouac)
 * 
 * Source: LanguageTool (TEMPORARY_BIVOUAC_BIVOUAC)
 * Category: style
 */
export const temporaryBivouacBivouacRule: GrammarRule = {
  id: 'temporary-bivouac-bivouac',
  name: 'temporary bivouac (bivouac)',
  description: 'This phrase may be redundant. Consider writing .',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btemporary\b\s+\bbivouac\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase may be redundant. Consider writing .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
