import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * deep-seeded (deep-seated)
 * 
 * Source: LanguageTool (DEEP_SEEDED)
 * Category: grammar
 */
export const deepSeededRule: GrammarRule = {
  id: 'deep-seeded',
  name: 'deep-seeded (deep-seated)',
  description: 'Did you mean deep-seated?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdeep-seeded\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean deep-seated?',
        suggestions: ["deep-seated"],
      });
    }
    
    return issues;
  },
};
