import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphens in 'up and coming'
 * 
 * Source: LanguageTool (UP_AND_COMING_HYPHEN)
 * Category: grammar
 */
export const upAndComingHyphenRule: GrammarRule = {
  id: 'up-and-coming-hyphen',
  name: 'missing hyphens in \'up and coming\'',
  description: 'The adjective \\1-\\2-\\3 is normally spelled with hyphens.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bup\b\s+\band\b\s+\bcoming\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2-\\3 is normally spelled with hyphens.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
