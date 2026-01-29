import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * buenos días
 * 
 * Source: LanguageTool (BUENOS_DIAS)
 * Category: grammar
 */
export const buenosDiasRule: GrammarRule = {
  id: 'buenos-dias',
  name: 'buenos días',
  description: 'Did you mean the Spanish greeting buenos ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbue?n[ao]s\b\s+\bdias?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the Spanish greeting buenos ?',
        suggestions: ["buenos"],
      });
    }
    
    return issues;
  },
};
