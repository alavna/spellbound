import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * aloud to (allowed to)
 * 
 * Source: LanguageTool (BE_ALOUD_TO)
 * Category: grammar
 */
export const beAloudToRule: GrammarRule = {
  id: 'be-aloud-to',
  name: 'aloud to (allowed to)',
  description: 'Possible typo. Did you mean allowed to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\baloud\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo. Did you mean allowed to?',
        suggestions: ["allowed to"],
      });
    }
    
    return issues;
  },
};
