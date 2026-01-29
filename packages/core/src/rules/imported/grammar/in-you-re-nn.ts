import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * you're (your)
 * 
 * Source: LanguageTool (IN_YOU_RE_NN)
 * Category: grammar
 */
export const inYouReNnRule: GrammarRule = {
  id: 'in-you-re-nn',
  name: 'you\'re (your)',
  description: 'Did you mean your?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bno\b\s+'re\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean your?',
        suggestions: ["your"],
      });
    }
    
    return issues;
  },
};
