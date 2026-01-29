import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * genera vs general
 * 
 * Source: LanguageTool (GENERA_GENERAL)
 * Category: grammar
 */
export const generaGeneralRule: GrammarRule = {
  id: 'genera-general',
  name: 'genera vs general',
  description: '\"Genera\" is the plural noun for \"genus\". Did you mean the adjective general?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|another|one\b\s+\bgenera\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Genera\" is the plural noun for \"genus\". Did you mean the adjective general?',
        suggestions: ["general"],
      });
    }
    
    return issues;
  },
};
