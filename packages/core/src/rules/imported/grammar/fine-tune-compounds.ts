import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fine tune (fine-tune)
 * 
 * Source: LanguageTool (FINE_TUNE_COMPOUNDS)
 * Category: grammar
 */
export const fineTuneCompoundsRule: GrammarRule = {
  id: 'fine-tune-compounds',
  name: 'fine tune (fine-tune)',
  description: 'The verb \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfine\b\s+\btune[ds]|tuning\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
