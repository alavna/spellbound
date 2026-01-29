import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing apostrophe in 'Presidents Day'
 * 
 * Source: LanguageTool (PRESIDENTS_DAY_APOSTROPHE)
 * Category: grammar
 */
export const presidentsDayApostropheRule: GrammarRule = {
  id: 'presidents-day-apostrophe',
  name: 'missing apostrophe in \'Presidents Day\'',
  description: 'It appears that a possessive apostrophe is missing, if you mean the legal holiday Presidents\' Day.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpresidents\b\s+\bday\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a possessive apostrophe is missing, if you mean the legal holiday Presidents\' Day.',
        suggestions: ["Presidents' Day"],
      });
    }
    
    return issues;
  },
};
