import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hitch hike (hitchhike)
 * 
 * Source: LanguageTool (HITCH_HIKE_COMPOUNDS)
 * Category: grammar
 */
export const hitchHikeCompoundsRule: GrammarRule = {
  id: 'hitch-hike-compounds',
  name: 'hitch hike (hitchhike)',
  description: 'This word is normally spelled with a hyphen (British English) or as one word (American English).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhitch\b\s+\bhikes?|hiking|hiked|hikers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled with a hyphen (British English) or as one word (American English).',
        suggestions: ["\\1-\\2","\\1"],
      });
    }
    
    return issues;
  },
};
