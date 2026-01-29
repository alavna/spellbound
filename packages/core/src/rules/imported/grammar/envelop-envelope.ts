import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * envelop (envelope)
 * 
 * Source: LanguageTool (ENVELOP_ENVELOPE)
 * Category: grammar
 */
export const envelopEnvelopeRule: GrammarRule = {
  id: 'envelop-envelope',
  name: 'envelop (envelope)',
  description: 'Did you mean the noun ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|their|our|your\b\s+\benvelops?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
