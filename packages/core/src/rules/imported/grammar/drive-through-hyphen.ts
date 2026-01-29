import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'drive-through'
 * 
 * Source: LanguageTool (DRIVE_THROUGH_HYPHEN)
 * Category: grammar
 */
export const driveThroughHyphenRule: GrammarRule = {
  id: 'drive-through-hyphen',
  name: 'missing hyphen in \'drive-through\'',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdrive\b\s+\bthrough\b\s+\S+\s+\brestaurants?|penalt(y|ies)|wash|shops?|facility|starbucks|mcdonalds|zoos?|safaris?|subways?|cinemas?|supermarkets?|sores?|markets?/gi;
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
