import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fort the (for the)
 * 
 * Source: LanguageTool (FORT_THE)
 * Category: grammar
 */
export const fortTheRule: GrammarRule = {
  id: 'fort-the',
  name: 'fort the (for the)',
  description: 'Did you mean for the?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ff]ort\b\s+\bthe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for the?',
        suggestions: ["for the"],
      });
    }
    
    return issues;
  },
};
