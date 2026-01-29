import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Alzheimers
 * 
 * Source: LanguageTool (ALZHEIMERS)
 * Category: grammar
 */
export const alzheimersRule: GrammarRule = {
  id: 'alzheimers',
  name: 'Alzheimers',
  description: 'The name of this disease is always capitalized and spelled with a possessive apostrophe.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bAlzheimers\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this disease is always capitalized and spelled with a possessive apostrophe.',
        suggestions: ["Alzheimer's"],
      });
    }
    
    return issues;
  },
};
