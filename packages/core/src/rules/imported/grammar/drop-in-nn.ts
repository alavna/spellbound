import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * drop-in
 * 
 * Source: LanguageTool (DROP_IN_NN)
 * Category: grammar
 */
export const dropInNnRule: GrammarRule = {
  id: 'drop-in-nn',
  name: 'drop-in',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdrop\b\s+\bin\b\s+\bbasis|discos?|replacements?|restaurants?|bars?|caf[eé]s?|clinics?|facility|periods?|seats?|audio\b/gi;
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
