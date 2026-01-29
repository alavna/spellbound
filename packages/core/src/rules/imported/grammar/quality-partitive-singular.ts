import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * this kind of days (day)
 * 
 * Source: LanguageTool (QUALITY_PARTITIVE_SINGULAR)
 * Category: grammar
 */
export const qualityPartitiveSingularRule: GrammarRule = {
  id: 'quality-partitive-singular',
  name: 'this kind of days (day)',
  description: 'In a construction like \"\\1 \\2 \\3 \\4 X\", X usually has to match the grammatical number of \"\\2\". Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthis|that\b\s+\bkind|sort|type\b\s+\bof\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In a construction like \"\\1 \\2 \\3 \\4 X\", X usually has to match the grammatical number of \"\\2\". Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
