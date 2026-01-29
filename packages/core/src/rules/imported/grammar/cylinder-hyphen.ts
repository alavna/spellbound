import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '8 cylinder engine'
 * 
 * Source: LanguageTool (CYLINDER_HYPHEN)
 * Category: grammar
 */
export const cylinderHyphenRule: GrammarRule = {
  id: 'cylinder-hyphen',
  name: 'missing hyphen in \'8 cylinder engine\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bcylinder\b\s+\bmotor|engines?|cars?|truck|pick\.?up|jeeps?|diesel|suvs?|turbos?|mustangs?|hatchbacks?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
