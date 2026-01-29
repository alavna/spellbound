import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'no fly zone'
 * 
 * Source: LanguageTool (NO_FLY_ZONE_HYPHEN)
 * Category: grammar
 */
export const noFlyZoneHyphenRule: GrammarRule = {
  id: 'no-fly-zone-hyphen',
  name: 'missing hyphen in \'no fly zone\'',
  description: 'This expression is usually spelled with a hyphen between \'\\1\' and \'\\2\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bno\b\s+\bfly|drive\b\s+\bzones?|lists?|areas?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This expression is usually spelled with a hyphen between \'\\1\' and \'\\2\'.',
        suggestions: ["\\1-\\2 \\3"],
      });
    }
    
    return issues;
  },
};
