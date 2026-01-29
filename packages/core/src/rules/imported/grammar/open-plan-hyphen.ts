import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'open plan'
 * 
 * Source: LanguageTool (OPEN_PLAN_HYPHEN)
 * Category: grammar
 */
export const openPlanHyphenRule: GrammarRule = {
  id: 'open-plan-hyphen',
  name: 'missing hyphen in \'open plan\'',
  description: 'Did you mean the adjective \\1-\\2 (spelled with a hyphen)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bopen\b\s+\bplan\b\s+\boffices?|rooms?|areas?|spaces?|restaurants?|caf[éeè]s?|kitchens?|houses?|layouts?|living\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective \\1-\\2 (spelled with a hyphen)?',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
