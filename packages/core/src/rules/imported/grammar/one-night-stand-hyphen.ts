import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'one night stand'
 * 
 * Source: LanguageTool (ONE_NIGHT_STAND_HYPHEN)
 * Category: grammar
 */
export const oneNightStandHyphenRule: GrammarRule = {
  id: 'one-night-stand-hyphen',
  name: 'missing hyphen in \'one night stand\'',
  description: 'This noun is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bone\b\s+\bnight\b\s+\bstands?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
