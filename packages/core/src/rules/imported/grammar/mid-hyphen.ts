import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen after 'mid'
 * 
 * Source: LanguageTool (MID_HYPHEN)
 * Category: grammar
 */
export const midHyphenRule: GrammarRule = {
  id: 'mid-hyphen',
  name: 'missing hyphen after \'mid\'',
  description: 'This word is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
