import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * there're → there are
 * 
 * Source: LanguageTool (THERE_RE_CONTRACTION_UNCOMMON)
 * Category: style
 */
export const thereReContractionUncommonRule: GrammarRule = {
  id: 'there-re-contraction-uncommon',
  name: 'there\'re → there are',
  description: 'The contraction \'\\1\\2\' is uncommon in written English.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[tw]?here\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The contraction \'\\1\\2\' is uncommon in written English.',
        suggestions: ["\\1 are"],
      });
    }
    
    return issues;
  },
};
