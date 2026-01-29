import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * knot (not)
 * 
 * Source: LanguageTool (CONFUSION_KNOT_NOT)
 * Category: grammar
 */
export const confusionKnotNotRule: GrammarRule = {
  id: 'confusion-knot-not',
  name: 'knot (not)',
  description: 'Did you mean the negation \\1 not?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bknot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the negation \\1 not?',
        suggestions: ["\\1 not"],
      });
    }
    
    return issues;
  },
};
