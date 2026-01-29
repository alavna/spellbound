import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * parmesan (Parmesan)
 * 
 * Source: LanguageTool (PARMESAN)
 * Category: grammar
 */
export const parmesanRule: GrammarRule = {
  id: 'parmesan',
  name: 'parmesan (Parmesan)',
  description: 'The word for this type of cheese is normally capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bparmesan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word for this type of cheese is normally capitalized.',
        suggestions: ["Parmesan"],
      });
    }
    
    return issues;
  },
};
