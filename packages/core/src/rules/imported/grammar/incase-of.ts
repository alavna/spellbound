import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * incase (in case) of
 * 
 * Source: LanguageTool (INCASE_OF)
 * Category: grammar
 */
export const incaseOfRule: GrammarRule = {
  id: 'incase-of',
  name: 'incase (in case) of',
  description: 'Did you mean in case of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bincase\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in case of?',
        suggestions: ["in case of"],
      });
    }
    
    return issues;
  },
};
