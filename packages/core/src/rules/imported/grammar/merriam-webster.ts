import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Merriam Webster (Merriam-Webster)
 * 
 * Source: LanguageTool (MERRIAM_WEBSTER)
 * Category: grammar
 */
export const merriamWebsterRule: GrammarRule = {
  id: 'merriam-webster',
  name: 'Merriam Webster (Merriam-Webster)',
  description: 'The name of this popular dictionary is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bMerr?iam\b\s+\bWebb?ster\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this popular dictionary is spelled with a hyphen.',
        suggestions: ["Merriam-Webster"],
      });
    }
    
    return issues;
  },
};
