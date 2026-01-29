import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrong genitive (e.g., 'employees's' instead of 'employee's')
 * 
 * Source: LanguageTool (WRONG_GENITIVE_APOSTROPHE)
 * Category: grammar
 */
export const wrongGenitiveApostropheRule: GrammarRule = {
  id: 'wrong-genitive-apostrophe',
  name: 'wrong genitive (e.g., \'employees\'s\' instead of \'employee\'s\')',
  description: 'Did you mean \'s or \\1\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'s or \\1\'?',
        suggestions: ["'s","\\1'"],
      });
    }
    
    return issues;
  },
};
