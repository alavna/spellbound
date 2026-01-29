import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * street light (streetlight)
 * 
 * Source: LanguageTool (STREET_LIGHTS_COMPOUND)
 * Category: grammar
 */
export const streetLightsCompoundRule: GrammarRule = {
  id: 'street-lights-compound',
  name: 'street light (streetlight)',
  description: 'In American English this noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstreet\b\s+\blights?|lamps?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In American English this noun is spelled as one word.',
        suggestions: ["street"],
      });
    }
    
    return issues;
  },
};
