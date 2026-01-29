import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * stand alone (standalone)
 * 
 * Source: LanguageTool (STAND_ALONE_NN)
 * Category: grammar
 */
export const standAloneNnRule: GrammarRule = {
  id: 'stand-alone-nn',
  name: 'stand alone (standalone)',
  description: 'In this context, this term is usually written with a hyphen or as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstand\b\s+\balone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, this term is usually written with a hyphen or as one word.',
        suggestions: ["\\1-\\2","\\1\\2"],
      });
    }
    
    return issues;
  },
};
