import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for some reasons (reason)
 * 
 * Source: LanguageTool (FOR_WHATEVER_REASONS)
 * Category: grammar
 */
export const forWhateverReasonsRule: GrammarRule = {
  id: 'for-whatever-reasons',
  name: 'for some reasons (reason)',
  description: 'This idiom is spelled with the singular form \"reason\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bsome|whatever\b\s+\breasons\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This idiom is spelled with the singular form \"reason\".',
        suggestions: ["\\1 \\2"],
      });
    }
    
    return issues;
  },
};
