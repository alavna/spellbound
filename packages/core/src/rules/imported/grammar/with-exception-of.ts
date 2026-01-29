import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * with (the) exception of
 * 
 * Source: LanguageTool (WITH_EXCEPTION_OF)
 * Category: grammar
 */
export const withExceptionOfRule: GrammarRule = {
  id: 'with-exception-of',
  name: 'with (the) exception of',
  description: 'It appears that an article is missing in this idiom.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwith\b\s+\bexception\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing in this idiom.',
        suggestions: ["\\1 the \\2 \\3"],
      });
    }
    
    return issues;
  },
};
