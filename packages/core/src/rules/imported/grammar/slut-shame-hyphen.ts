import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * slut-shame
 * 
 * Source: LanguageTool (SLUT_SHAME_HYPHEN)
 * Category: grammar
 */
export const slutShameHyphenRule: GrammarRule = {
  id: 'slut-shame-hyphen',
  name: 'slut-shame',
  description: 'The verb \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bslut|body\b\s+\bshame[sd]?|shaming\b/gi;
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
