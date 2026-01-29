import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Aircrafts
 * 
 * Source: LanguageTool (AIRCRAFTS)
 * Category: grammar
 */
export const aircraftsRule: GrammarRule = {
  id: 'aircrafts',
  name: 'Aircrafts',
  description: 'The plural of \"\" is not \"\\1\" but .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baircrafts\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The plural of \"\" is not \"\\1\" but .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
