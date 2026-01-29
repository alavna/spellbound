import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I use have …
 * 
 * Source: LanguageTool (VBP_VBP)
 * Category: grammar
 */
export const vbpVbpRule: GrammarRule = {
  id: 'vbp-vbp',
  name: 'I use have …',
  description: 'It appears that only one verb is correct here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bI|we|they|you\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that only one verb is correct here.',
        suggestions: ["\\3","\\4"],
      });
    }
    
    return issues;
  },
};
