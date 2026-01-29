import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'life changing moments'
 * 
 * Source: LanguageTool (LIFE_CHANGING_HYPHEN)
 * Category: grammar
 */
export const lifeChangingHyphenRule: GrammarRule = {
  id: 'life-changing-hyphen',
  name: 'missing hyphen in \'life changing moments\'',
  description: 'Did you mean the adjective \\1-\\2 (spelled with a hyphen)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blife\b\s+\bchanging\b\s+\bdecisions?|experiences?|moments?|events?|lessons?|moves?|conversations?|therap(y|ies)|journeys?|opportunit(y|ies)|books?|stor(y|ies)|magic|powers?|steps?|medicines?/gi;
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
