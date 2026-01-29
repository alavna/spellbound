import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * because of we (because we)
 * 
 * Source: LanguageTool (BECAUSE_OF_I)
 * Category: grammar
 */
export const becauseOfIRule: GrammarRule = {
  id: 'because-of-i',
  name: 'because of we (because we)',
  description: 'Probable usage error. Use \\1 \\3 instead.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbecause\b\s+\bof\b\s+\bI|s?he|we|they\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Probable usage error. Use \\1 \\3 instead.',
        suggestions: ["\\1 \\3"],
      });
    }
    
    return issues;
  },
};
