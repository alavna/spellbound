import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'dry erase'
 * 
 * Source: LanguageTool (DRY_ERASE_HYPHEN)
 * Category: grammar
 */
export const dryEraseHyphenRule: GrammarRule = {
  id: 'dry-erase-hyphen',
  name: 'missing hyphen in \'dry erase\'',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdry\b\s+\berase\b\s+.*boards?|markers?|paint.*|pen.*|calendars?|papers?|sheets?|crayons?|ink.*|kits?|surfaces?|environments?|decals?|erasers?|chalk\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
