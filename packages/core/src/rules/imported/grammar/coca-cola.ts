import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Coca Cola (Coca-Cola)
 * 
 * Source: LanguageTool (COCA_COLA)
 * Category: grammar
 */
export const cocaColaRule: GrammarRule = {
  id: 'coca-cola',
  name: 'Coca Cola (Coca-Cola)',
  description: 'The name of this popular soft drink is capitalized and spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bCoca\b\s+\bCola\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this popular soft drink is capitalized and spelled with a hyphen.',
        suggestions: ["Coca-Cola"],
      });
    }
    
    return issues;
  },
};
