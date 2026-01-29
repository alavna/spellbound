import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * air plane/aeroplane
 * 
 * Source: LanguageTool (AIR_PLANE_AEROPLANE)
 * Category: grammar
 */
export const airPlaneAeroplaneRule: GrammarRule = {
  id: 'air-plane-aeroplane',
  name: 'air plane/aeroplane',
  description: 'The term \'\\1 \\2\' is common for American English. For British English use aeroplane.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bair\b\s+\bplanes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The term \'\\1 \\2\' is common for American English. For British English use aeroplane.',
        suggestions: ["aeroplane"],
      });
    }
    
    return issues;
  },
};
