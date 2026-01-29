import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Latinate comparatives (e.g. superior than/to)
 * 
 * Source: LanguageTool (SUPERIOR_THAN_TO)
 * Category: grammar
 */
export const superiorThanToRule: GrammarRule = {
  id: 'superior-than-to',
  name: 'Latinate comparatives (e.g. superior than/to)',
  description: 'The comparative \'\\1\' is usually followed by \'to\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\binferior|superior\b\s+\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The comparative \'\\1\' is usually followed by \'to\'.',
        suggestions: ["\\1 to"],
      });
    }
    
    return issues;
  },
};
