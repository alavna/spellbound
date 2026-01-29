import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * grave yard (graveyard)
 * 
 * Source: LanguageTool (YARD_COMPOUNDS)
 * Category: grammar
 */
export const yardCompoundsRule: GrammarRule = {
  id: 'yard-compounds',
  name: 'grave yard (graveyard)',
  description: 'This word is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgrave|ship|dock|vine|farm|junk|boat|barn|door|lumber|church|steel|stock|lan|scrap|brick|ball\b\s+\byards?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
