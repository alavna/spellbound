import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'must to' instead of 'have to'
 * 
 * Source: LanguageTool (MUST_HAVE_TO)
 * Category: grammar
 */
export const mustHaveToRule: GrammarRule = {
  id: 'must-have-to',
  name: '\'must to\' instead of \'have to\'',
  description: 'After \'must\', the verb is used without \'to\'. Probably, you should use must or have to here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmust\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'After \'must\', the verb is used without \'to\'. Probably, you should use must or have to here.',
        suggestions: ["must","have to"],
      });
    }
    
    return issues;
  },
};
