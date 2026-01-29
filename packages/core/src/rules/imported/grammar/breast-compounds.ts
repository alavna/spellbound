import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * breast plate (breastplate)
 * 
 * Source: LanguageTool (BREAST_COMPOUNDS)
 * Category: grammar
 */
export const breastCompoundsRule: GrammarRule = {
  id: 'breast-compounds',
  name: 'breast plate (breastplate)',
  description: 'The word breast is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbreast\b\s+\bplates?|feed(s|ing)?|fed|bones?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word breast is spelled as one word.',
        suggestions: ["breast"],
      });
    }
    
    return issues;
  },
};
