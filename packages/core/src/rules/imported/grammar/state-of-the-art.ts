import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * state of the art (state-of-the-art)
 * 
 * Source: LanguageTool (STATE_OF_THE_ART)
 * Category: grammar
 */
export const stateOfTheArtRule: GrammarRule = {
  id: 'state-of-the-art',
  name: 'state of the art (state-of-the-art)',
  description: 'Consider adding hyphens to this phrasal adjective.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstate\b\s+\bof\b\s+\bthe\b\s+\bart\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding hyphens to this phrasal adjective.',
        suggestions: ["\\1-\\2-\\3-\\4"],
      });
    }
    
    return issues;
  },
};
